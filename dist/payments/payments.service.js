"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const payment_schema_1 = require("./payment.schema");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const users_service_1 = require("../users/users.service");
const pagination_util_1 = require("../utils/pagination.util");
let PaymentsService = class PaymentsService {
    paymentModel;
    configService;
    subscriptionsService;
    usersService;
    paystackBaseUrl = 'https://api.paystack.co';
    secretKey;
    constructor(paymentModel, configService, subscriptionsService, usersService) {
        this.paymentModel = paymentModel;
        this.configService = configService;
        this.subscriptionsService = subscriptionsService;
        this.usersService = usersService;
        this.secretKey = this.configService.get('PAYSTACK_SECRET_KEY') || '';
    }
    getHeaders() {
        return {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
        };
    }
    async initializePayment(userId, subscriptionId, email, callbackUrl) {
        const plan = await this.subscriptionsService.findById(subscriptionId);
        const reference = `INT_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const amountInKobo = plan.price;
        const payment = new this.paymentModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            subscriptionId: new mongoose_2.Types.ObjectId(subscriptionId),
            amount: amountInKobo,
            reference,
            status: payment_schema_1.PaymentStatus.PENDING,
        });
        await payment.save();
        try {
            const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/initialize`, {
                email,
                amount: amountInKobo,
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
            }, { headers: this.getHeaders() });
            return {
                authorization_url: response.data.data.authorization_url,
                access_code: response.data.data.access_code,
                reference: response.data.data.reference,
            };
        }
        catch (error) {
            await this.paymentModel.findByIdAndDelete(payment._id);
            throw new common_1.BadRequestException(error.response?.data?.message || 'Failed to initialize payment with Paystack');
        }
    }
    async verifyPayment(reference) {
        const payment = await this.paymentModel.findOne({ reference }).exec();
        if (!payment)
            throw new common_1.NotFoundException('Payment record not found');
        if (payment.status === payment_schema_1.PaymentStatus.SUCCESS) {
            return { message: 'Payment already verified', payment, verified: true };
        }
        try {
            const response = await axios_1.default.get(`${this.paystackBaseUrl}/transaction/verify/${reference}`, { headers: this.getHeaders() });
            const data = response.data.data;
            payment.paystackResponse = data;
            if (data.status === 'success') {
                payment.status = payment_schema_1.PaymentStatus.SUCCESS;
                await payment.save();
                await this.activateUserSubscription(payment.userId.toString(), payment.subscriptionId.toString());
                return { message: 'Payment verified successfully', payment, verified: true };
            }
            else {
                payment.status = payment_schema_1.PaymentStatus.FAILED;
                await payment.save();
                return { message: 'Payment verification failed', payment, verified: false };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response?.data?.message || 'Failed to verify payment with Paystack');
        }
    }
    async handleWebhook(eventData) {
        if (eventData.event === 'charge.success') {
            const reference = eventData.data?.reference;
            if (!reference)
                return { message: 'No reference found' };
            const payment = await this.paymentModel.findOne({ reference }).exec();
            if (!payment)
                return { message: 'Payment not found' };
            if (payment.status === payment_schema_1.PaymentStatus.SUCCESS) {
                return { message: 'Already processed' };
            }
            payment.status = payment_schema_1.PaymentStatus.SUCCESS;
            payment.paystackResponse = eventData.data;
            await payment.save();
            await this.activateUserSubscription(payment.userId.toString(), payment.subscriptionId.toString());
            return { message: 'Webhook processed successfully' };
        }
        return { message: 'Event type not handled' };
    }
    async activateUserSubscription(userId, subscriptionId) {
        try {
            const plan = await this.subscriptionsService.findById(subscriptionId);
            await this.usersService.activateSubscription(userId, plan.durationMonths);
        }
        catch (error) {
            console.error('Failed to activate subscription for user:', userId, error);
        }
    }
    async findAll(params = {}) {
        return (0, pagination_util_1.paginateQuery)(this.paymentModel, {}, params, ['reference', 'status'], [{ path: 'userId', select: 'firstName lastName email' }, { path: 'subscriptionId', select: 'name price durationMonths' }]);
    }
    async findByUser(userId) {
        return this.paymentModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('subscriptionId', 'name price durationMonths')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getPaymentStats() {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const [totalRevenue, monthlyRevenue, totalPayments, successfulPayments, failedPayments] = await Promise.all([
            this.paymentModel.aggregate([
                { $match: { status: payment_schema_1.PaymentStatus.SUCCESS } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]).exec(),
            this.paymentModel.aggregate([
                { $match: { status: payment_schema_1.PaymentStatus.SUCCESS, createdAt: { $gte: thirtyDaysAgo } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]).exec(),
            this.paymentModel.countDocuments().exec(),
            this.paymentModel.countDocuments({ status: payment_schema_1.PaymentStatus.SUCCESS }).exec(),
            this.paymentModel.countDocuments({ status: payment_schema_1.PaymentStatus.FAILED }).exec(),
        ]);
        return {
            totalRevenue: totalRevenue[0]?.total || 0,
            monthlyRevenue: monthlyRevenue[0]?.total || 0,
            totalPayments,
            successfulPayments,
            failedPayments,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        subscriptions_service_1.SubscriptionsService,
        users_service_1.UsersService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map