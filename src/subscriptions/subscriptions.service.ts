import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { paginateQuery, PaginationParams } from '../utils/pagination.util';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(data: Partial<Subscription>): Promise<SubscriptionDocument> {
    return new this.subscriptionModel(data).save();
  }

  async findAll(params: PaginationParams = {}): Promise<any> {
    return paginateQuery(this.subscriptionModel, {}, params, ['name', 'description']);
  }

  async findActive(): Promise<SubscriptionDocument[]> {
    return this.subscriptionModel.find({ isActive: true }).sort({ price: 1 }).exec();
  }

  async findById(id: string): Promise<SubscriptionDocument> {
    const sub = await this.subscriptionModel.findById(id).exec();
    if (!sub) throw new NotFoundException('Subscription plan not found');
    return sub;
  }

  async update(id: string, data: Partial<Subscription>): Promise<SubscriptionDocument> {
    const sub = await this.subscriptionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!sub) throw new NotFoundException('Subscription plan not found');
    return sub;
  }

  async delete(id: string): Promise<SubscriptionDocument> {
    const sub = await this.subscriptionModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
    if (!sub) throw new NotFoundException('Subscription plan not found');
    return sub;
  }
}
