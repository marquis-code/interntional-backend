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
var PaymentsCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const config_1 = require("@nestjs/config");
const payment_schema_1 = require("./payment.schema");
const email_service_1 = require("../utils/email.service");
const axios_1 = __importDefault(require("axios"));
let PaymentsCronService = PaymentsCronService_1 = class PaymentsCronService {
    userModel;
    paymentModel;
    subscriptionsService;
    configService;
    emailService;
    logger = new common_1.Logger(PaymentsCronService_1.name);
    paystackBaseUrl = 'https://api.paystack.co';
    secretKey;
    constructor(userModel, paymentModel, subscriptionsService, configService, emailService) {
        this.userModel = userModel;
        this.paymentModel = paymentModel;
        this.subscriptionsService = subscriptionsService;
        this.configService = configService;
        this.emailService = emailService;
        this.secretKey = this.configService.get('PAYSTACK_SECRET_KEY') || '';
    }
    getHeaders() {
        return {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
        };
    }
    async processRecurringPayments() {
        this.logger.debug('Running daily recurring payment check...');
        const now = new Date();
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
                    status: payment_schema_1.PaymentStatus.PENDING,
                });
                await payment.save();
                const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/charge_authorization`, {
                    email: user.email,
                    amount: amountInKobo,
                    authorization_code: user.paystackAuthCode,
                    reference,
                    metadata: {
                        userId: user._id.toString(),
                        subscriptionId: plan._id.toString(),
                        isRecurring: true,
                    }
                }, { headers: this.getHeaders() });
                const data = response.data.data;
                if (data.status === 'success') {
                    payment.status = payment_schema_1.PaymentStatus.SUCCESS;
                    payment.paystackResponse = data;
                    await payment.save();
                    const newEndDate = new Date(user.subscriptionEndDate || now);
                    newEndDate.setMonth(newEndDate.getMonth() + plan.durationMonths);
                    user.subscriptionEndDate = newEndDate;
                    await user.save();
                    this.logger.log(`Successfully charged recurring payment for user ${user.email}`);
                }
                else {
                    payment.status = payment_schema_1.PaymentStatus.FAILED;
                    payment.paystackResponse = data;
                    await payment.save();
                    user.isSubscriptionActive = false;
                    await user.save();
                    this.logger.warn(`Failed recurring payment for user ${user.email}. Deactivated subscription.`);
                }
            }
            catch (error) {
                this.logger.error(`Error processing recurring payment for user ${user.email}:`, error?.response?.data || error.message);
                user.isSubscriptionActive = false;
                await user.save();
            }
        }
    }
    async sendSubscriptionReminders() {
        this.logger.debug('Running daily subscription reminder check...');
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
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
            }
            catch (error) {
                this.logger.error(`Failed to process reminder for ${user.email}`, error);
            }
        }
    }
    async sendUpgradeReminders() {
        this.logger.debug('Running monthly upgrade reminders check...');
        const users = await this.userModel.find({
            isSubscriptionActive: true,
            activeSubscription: { $ne: null }
        }).exec();
        if (users.length === 0)
            return;
        const plans = await this.subscriptionsService.findAll();
        const highestPrice = Math.max(...plans.map(p => p.price));
        for (const user of users) {
            try {
                const plan = plans.find(p => p._id.toString() === user.activeSubscription.toString());
                if (plan && plan.price < highestPrice) {
                    const source = user.universityId ? 'universe' : 'intern';
                    await this.emailService.sendUpgradeReminderEmail(user.email, user.firstName, plan.name, source);
                }
            }
            catch (error) {
                this.logger.error(`Failed to process upgrade reminder for ${user.email}`, error);
            }
        }
    }
};
exports.PaymentsCronService = PaymentsCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_1AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsCronService.prototype, "processRecurringPayments", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsCronService.prototype, "sendSubscriptionReminders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsCronService.prototype, "sendUpgradeReminders", null);
exports.PaymentsCronService = PaymentsCronService = PaymentsCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        subscriptions_service_1.SubscriptionsService,
        config_1.ConfigService,
        email_service_1.EmailService])
], PaymentsCronService);
//# sourceMappingURL=payments.cron.js.map