import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserStatus } from '../users/schemas/user.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentDocument, PaymentStatus } from './payment.schema';
import { EmailService } from '../utils/email.service';
import axios from 'axios';

@Injectable()
export class PaymentsCronService {
  private readonly logger = new Logger(PaymentsCronService.name);
  private paystackBaseUrl = 'https://api.paystack.co';
  private secretKey: string;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private subscriptionsService: SubscriptionsService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async processRecurringPayments() {
    this.logger.debug('Running daily recurring payment check...');
    
    const now = new Date();
    // Find users whose subscription expires today or earlier, and they have an auth code and active sub
    const usersDue = await this.userModel.find({
      isSubscriptionActive: true,
      subscriptionEndDate: { $lte: now },
      paystackAuthCode: { $ne: null, $exists: true },
      activeSubscription: { $ne: null }
    }).exec();

    if (usersDue.length === 0) {
      this.logger.debug('No recurring payments due today.');
      return;
    }

    this.logger.log(`Found ${usersDue.length} user(s) due for recurring payment. Processing...`);

    for (const user of usersDue) {
      try {
        const plan = await this.subscriptionsService.findById(user.activeSubscription.toString());
        if (plan.price <= 0) {
          // Free plan, just extend it
          const newEndDate = new Date(user.subscriptionEndDate || now);
          newEndDate.setMonth(newEndDate.getMonth() + plan.durationMonths);
          user.subscriptionEndDate = newEndDate;
          await user.save();
          continue;
        }

        const amountInKobo = plan.price;
        const reference = `REC_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        const payment = new this.paymentModel({
          userId: user._id,
          subscriptionId: plan._id,
          amount: amountInKobo,
          reference,
          status: PaymentStatus.PENDING,
        });
        await payment.save();

        const response = await axios.post(
          `${this.paystackBaseUrl}/transaction/charge_authorization`,
          {
            email: user.email,
            amount: amountInKobo,
            authorization_code: user.paystackAuthCode,
            reference,
            metadata: {
              userId: user._id.toString(),
              subscriptionId: plan._id.toString(),
              isRecurring: true,
            }
          },
          { headers: this.getHeaders() }
        );

        const data = response.data.data;
        if (data.status === 'success') {
          payment.status = PaymentStatus.SUCCESS;
          payment.paystackResponse = data;
          await payment.save();

          // Extend subscription
          const newEndDate = new Date(user.subscriptionEndDate || now);
          newEndDate.setMonth(newEndDate.getMonth() + plan.durationMonths);
          user.subscriptionEndDate = newEndDate;
          await user.save();
          this.logger.log(`Successfully charged recurring payment for user ${user.email}`);
        } else {
          payment.status = PaymentStatus.FAILED;
          payment.paystackResponse = data;
          await payment.save();

          // Deactivate
          user.isSubscriptionActive = false;
          await user.save();
          this.logger.warn(`Failed recurring payment for user ${user.email}. Deactivated subscription.`);
        }
      } catch (error: any) {
        this.logger.error(`Error processing recurring payment for user ${user.email}:`, error?.response?.data || error.message);
        user.isSubscriptionActive = false;
        await user.save();
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async sendSubscriptionReminders() {
    this.logger.debug('Running daily subscription reminder check...');
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // 3 days from now
    
    // Set to start of day and end of day to find all expiring on that day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const usersDueForReminder = await this.userModel.find({
      isSubscriptionActive: true,
      subscriptionEndDate: { $gte: startOfDay, $lte: endOfDay },
      activeSubscription: { $ne: null }
    }).exec();

    if (usersDueForReminder.length === 0) {
      return;
    }

    this.logger.log(`Found ${usersDueForReminder.length} user(s) whose subscription expires in 3 days. Sending reminders...`);

    for (const user of usersDueForReminder) {
      try {
        const plan = await this.subscriptionsService.findById(user.activeSubscription.toString());
        const source = user.universityId ? 'universe' : 'intern';
        await this.emailService.sendSubscriptionReminderEmail(user.email, user.firstName, plan.name, 3, source);
      } catch (error) {
        this.logger.error(`Failed to process reminder for ${user.email}`, error);
      }
    }
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async sendUpgradeReminders() {
    this.logger.debug('Running monthly upgrade reminders check...');
    
    // Find all users with active subscriptions
    const users = await this.userModel.find({
      isSubscriptionActive: true,
      activeSubscription: { $ne: null }
    }).exec();

    if (users.length === 0) return;

    // Fetch all plans to compare
    const plans = await this.subscriptionsService.findAll();
    const highestPrice = Math.max(...plans.map(p => p.price));

    for (const user of users) {
      try {
        const plan = plans.find(p => p._id.toString() === user.activeSubscription.toString());
        if (plan && plan.price < highestPrice) {
          // Send upgrade reminder to users not on the highest tier
          const source = user.universityId ? 'universe' : 'intern';
          await this.emailService.sendUpgradeReminderEmail(user.email, user.firstName, plan.name, source);
        }
      } catch (error) {
        this.logger.error(`Failed to process upgrade reminder for ${user.email}`, error);
      }
    }
  }
}
