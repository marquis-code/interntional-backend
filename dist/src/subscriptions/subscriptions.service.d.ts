import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { PaginationParams } from '../utils/pagination.util';
export declare class SubscriptionsService {
    private subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(data: Partial<Subscription>): Promise<SubscriptionDocument>;
    findAll(params?: PaginationParams): Promise<any>;
    findActive(): Promise<SubscriptionDocument[]>;
    findById(id: string): Promise<SubscriptionDocument>;
    update(id: string, data: Partial<Subscription>): Promise<SubscriptionDocument>;
    delete(id: string): Promise<SubscriptionDocument>;
}
