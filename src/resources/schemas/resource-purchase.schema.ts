import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResourcePurchaseDocument = ResourcePurchase & Document;

@Schema({ timestamps: true })
export class ResourcePurchase {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Resource', required: true })
  resource: Types.ObjectId;

  @Prop({ required: true })
  amountPaid: number;

  @Prop({ required: true })
  reference: string;

  @Prop({ default: 'completed' })
  status: string;
}

export const ResourcePurchaseSchema = SchemaFactory.createForClass(ResourcePurchase);
