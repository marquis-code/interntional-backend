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

  @Prop({ default: true })
  isActive: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
