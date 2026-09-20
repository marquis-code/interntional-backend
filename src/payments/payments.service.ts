import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Payment, PaymentDocument, PaymentStatus } from './payment.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentsService {
  private paystackBaseUrl = 'https://api.paystack.co';
  private secretKey: string;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private configService: ConfigService,
    private subscriptionsService: SubscriptionsService,
    private usersService: UsersService,
  ) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Initialize a Paystack transaction
   */
  async initializePayment(userId: string, subscriptionId: string, email: string, callbackUrl: string) {
    // Get the subscription plan
    const plan = await this.subscriptionsService.findById(subscriptionId);

    // Generate unique reference
    const reference = `INT_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Price is stored in kobo already in the schema
    const amountInKobo = plan.price;

    // Create payment record
    const payment = new this.paymentModel({
      userId: new Types.ObjectId(userId),
      subscriptionId: new Types.ObjectId(subscriptionId),
      amount: amountInKobo,
      reference,
      status: PaymentStatus.PENDING,
    });
    await payment.save();

    // Initialize with Paystack
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/transaction/initialize`,
        {
          email,
          amount: amountInKobo, // Amount in kobo
          reference,
          callback_url: callbackUrl,
          metadata: {
            userId,
            subscriptionId,
            planName: plan.name,
            custom_fields: [
              {
                display_name: 'Plan',
                variable_name: 'plan',
                value: plan.name,
              },
            ],
          },
        },
        { headers: this.getHeaders() },
      );

      return {
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        reference: response.data.data.reference,
      };
    } catch (error: any) {
      // Clean up the payment record on failure
      await this.paymentModel.findByIdAndDelete(payment._id);
      throw new BadRequestException(
        error.response?.data?.message || 'Failed to initialize payment with Paystack',
      );
    }
  }

  /**
   * Verify a Paystack transaction
   */
  async verifyPayment(reference: string) {
    const payment = await this.paymentModel.findOne({ reference }).exec();
    if (!payment) throw new NotFoundException('Payment record not found');

    // Already verified
    if (payment.status === PaymentStatus.SUCCESS) {
      return { message: 'Payment already verified', payment, verified: true };
    }

    try {
      const response = await axios.get(
        `${this.paystackBaseUrl}/transaction/verify/${reference}`,
        { headers: this.getHeaders() },
      );

      const data = response.data.data;
      payment.paystackResponse = data;

      if (data.status === 'success') {
        payment.status = PaymentStatus.SUCCESS;
        await payment.save();

        // Activate the user's subscription
        await this.activateUserSubscription(payment.userId.toString(), payment.subscriptionId.toString());

        return { message: 'Payment verified successfully', payment, verified: true };
      } else {
        payment.status = PaymentStatus.FAILED;
        await payment.save();
        return { message: 'Payment verification failed', payment, verified: false };
      }
    } catch (error: any) {
      throw new BadRequestException(
        error.response?.data?.message || 'Failed to verify payment with Paystack',
      );
    }
  }

  /**
   * Handle Paystack webhook event
   */
  async handleWebhook(eventData: any) {
    if (eventData.event === 'charge.success') {
      const reference = eventData.data?.reference;
      if (!reference) return { message: 'No reference found' };

      const payment = await this.paymentModel.findOne({ reference }).exec();
      if (!payment) return { message: 'Payment not found' };

      if (payment.status === PaymentStatus.SUCCESS) {
        return { message: 'Already processed' };
      }

      payment.status = PaymentStatus.SUCCESS;
      payment.paystackResponse = eventData.data;
      await payment.save();

      // Activate subscription
      await this.activateUserSubscription(payment.userId.toString(), payment.subscriptionId.toString());

      return { message: 'Webhook processed successfully' };
    }
    return { message: 'Event type not handled' };
  }

  /**
   * Activate user subscription after successful payment
   */
  private async activateUserSubscription(userId: string, subscriptionId: string) {
    try {
      const plan = await this.subscriptionsService.findById(subscriptionId);
      await this.usersService.activateSubscription(userId, plan.durationMonths);
    } catch (error) {
      // Log but don't throw — payment was already successful
      console.error('Failed to activate subscription for user:', userId, error);
    }
  }

  /**
   * Get all payments (admin)
   */
  async findAll(): Promise<PaymentDocument[]> {
    return this.paymentModel
      .find()
      .populate('userId', 'firstName lastName email')
      .populate('subscriptionId', 'name price durationMonths')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get payments for a specific user
   */
  async findByUser(userId: string): Promise<PaymentDocument[]> {
    return this.paymentModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('subscriptionId', 'name price durationMonths')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get payment stats for admin dashboard
   */
  async getPaymentStats() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalRevenue, monthlyRevenue, totalPayments, successfulPayments, failedPayments] = await Promise.all([
      this.paymentModel.aggregate([
        { $match: { status: PaymentStatus.SUCCESS } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).exec(),
      this.paymentModel.aggregate([
        { $match: { status: PaymentStatus.SUCCESS, createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).exec(),
      this.paymentModel.countDocuments().exec(),
      this.paymentModel.countDocuments({ status: PaymentStatus.SUCCESS }).exec(),
      this.paymentModel.countDocuments({ status: PaymentStatus.FAILED }).exec(),
    ]);

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      totalPayments,
      successfulPayments,
      failedPayments,
    };
  }
}
