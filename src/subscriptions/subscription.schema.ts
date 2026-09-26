import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  price: number; // Price in kobo (Paystack uses kobo for NGN)

  @Prop({ required: true, default: 1 })
  durationMonths: number;

  @Prop({ type: [String], default: [] })
  features: string[];

  // Robust Access Controls
  @Prop({ default: 0 })
  maxMentorshipRequests: number;

  @Prop({ default: false })
  canAccessVault: boolean;

  @Prop({ default: false })
  canPostArticles: boolean;

  @Prop({ default: false })
  canAccessGlobalCommunity: boolean;

  @Prop({ default: 0 })
  eventDiscountPercentage: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
