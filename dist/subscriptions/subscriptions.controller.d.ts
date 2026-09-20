import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    findActive(): Promise<import("./subscription.schema").SubscriptionDocument[]>;
    findAll(): Promise<import("./subscription.schema").SubscriptionDocument[]>;
    create(body: {
        name: string;
        description: string;
        price: number;
        durationMonths: number;
        features: string[];
    }): Promise<import("./subscription.schema").SubscriptionDocument>;
    update(id: string, body: Partial<{
        name: string;
        description: string;
        price: number;
        durationMonths: number;
        features: string[];
        isActive: boolean;
    }>): Promise<import("./subscription.schema").SubscriptionDocument>;
    delete(id: string): Promise<import("./subscription.schema").SubscriptionDocument>;
}
