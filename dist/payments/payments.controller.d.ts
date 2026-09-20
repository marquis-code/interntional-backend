import { PaymentsService } from './payments.service';
import { ConfigService } from '@nestjs/config';
export declare class PaymentsController {
    private readonly paymentsService;
    private readonly configService;
    constructor(paymentsService: PaymentsService, configService: ConfigService);
    initialize(req: any, body: {
        subscriptionId: string;
        callbackUrl: string;
    }): Promise<{
        authorization_url: any;
        access_code: any;
        reference: any;
    }>;
    verify(reference: string): Promise<{
        message: string;
        payment: import("mongoose").Document<unknown, {}, import("./payment.schema").PaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./payment.schema").Payment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        verified: boolean;
    }>;
    webhook(body: any, signature: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./payment.schema").PaymentDocument[]>;
    getStats(): Promise<{
        totalRevenue: any;
        monthlyRevenue: any;
        totalPayments: number;
        successfulPayments: number;
        failedPayments: number;
    }>;
    findMine(req: any): Promise<import("./payment.schema").PaymentDocument[]>;
}
