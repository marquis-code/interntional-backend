import { Model } from 'mongoose';
import { UserDocument } from '../users/schemas/user.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { ConfigService } from '@nestjs/config';
import { PaymentDocument } from './payment.schema';
import { EmailService } from '../utils/email.service';
export declare class PaymentsCronService {
    private userModel;
    private paymentModel;
    private subscriptionsService;
    private configService;
    private emailService;
    private readonly logger;
    private paystackBaseUrl;
    private secretKey;
    constructor(userModel: Model<UserDocument>, paymentModel: Model<PaymentDocument>, subscriptionsService: SubscriptionsService, configService: ConfigService, emailService: EmailService);
    private getHeaders;
    processRecurringPayments(): Promise<void>;
    sendSubscriptionReminders(): Promise<void>;
    sendUpgradeReminders(): Promise<void>;
}
