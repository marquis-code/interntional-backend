import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentDocument } from './payment.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { UsersService } from '../users/users.service';
export declare class PaymentsService {
    private paymentModel;
    private configService;
    private subscriptionsService;
    private usersService;
    private paystackBaseUrl;
    private secretKey;
    constructor(paymentModel: Model<PaymentDocument>, configService: ConfigService, subscriptionsService: SubscriptionsService, usersService: UsersService);
    private getHeaders;
    initializePayment(userId: string, subscriptionId: string, email: string, callbackUrl: string): Promise<{
        authorization_url: any;
        access_code: any;
        reference: any;
    }>;
    verifyPayment(reference: string): Promise<{
        message: string;
        payment: import("mongoose").Document<unknown, {}, PaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & Payment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        verified: boolean;
    }>;
    handleWebhook(eventData: any): Promise<{
        message: string;
    }>;
    private activateUserSubscription;
    findAll(): Promise<PaymentDocument[]>;
    findByUser(userId: string): Promise<PaymentDocument[]>;
    getPaymentStats(): Promise<{
        totalRevenue: any;
        monthlyRevenue: any;
        totalPayments: number;
        successfulPayments: number;
        failedPayments: number;
    }>;
}
