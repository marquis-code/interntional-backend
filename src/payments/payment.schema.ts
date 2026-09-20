import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subscription', required: true })
  subscriptionId: Types.ObjectId;

  @Prop({ required: true })
  amount: number; // Amount in kobo

  @Prop({ required: true, unique: true })
  reference: string; // Paystack transaction reference

  @Prop({ default: PaymentStatus.PENDING, enum: PaymentStatus })
  status: PaymentStatus;

  @Prop({ type: Object, default: null })
  paystackResponse: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ reference: 1 });
