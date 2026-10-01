import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BountyDocument = Bounty & Document;

@Schema({ timestamps: true })
export class Bounty {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number; // in Kobo, 0 means free

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  provider: Types.ObjectId;

  @Prop({ required: true, enum: ['cv_review', 'mock_interview', 'career_planning', 'freelance_consulting'] })
  category: string;

  @Prop({ required: true, enum: ['internTional', 'uniVerse'] })
  environment: string;

  @Prop({ default: true })
  isActive: boolean; 

  @Prop({ default: 0 })
  bookingsCount: number;
}

export const BountySchema = SchemaFactory.createForClass(Bounty);
