import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BountyBookingDocument = BountyBooking & Document;

@Schema({ timestamps: true })
export class BountyBooking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: true })
  bounty: Types.ObjectId;

  @Prop({ required: true })
  amountPaid: number;

  @Prop({ required: true })
  reference: string; // Paystack reference

  @Prop({ required: true, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop({ required: false })
  clientNotes: string; // E.g., link to their CV, or specific questions they want answered in the interview
}

export const BountyBookingSchema = SchemaFactory.createForClass(BountyBooking);
