import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
export declare class SubscriptionsService {
    private subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(data: Partial<Subscription>): Promise<SubscriptionDocument>;
    findAll(): Promise<SubscriptionDocument[]>;
    findActive(): Promise<SubscriptionDocument[]>;
    findById(id: string): Promise<SubscriptionDocument>;
    update(id: string, data: Partial<Subscription>): Promise<SubscriptionDocument>;
    delete(id: string): Promise<SubscriptionDocument>;
}
