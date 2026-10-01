import { SubscriptionsService } from './subscriptions.service';
import type { PaginationParams } from '../utils/pagination.util';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    findActive(): Promise<import("./subscription.schema").SubscriptionDocument[]>;
    findAll(query: PaginationParams): Promise<any>;
    create(body: any): Promise<import("./subscription.schema").SubscriptionDocument>;
    update(id: string, body: any): Promise<import("./subscription.schema").SubscriptionDocument>;
    delete(id: string): Promise<import("./subscription.schema").SubscriptionDocument>;
}
