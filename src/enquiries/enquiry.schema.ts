import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Enquiry extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'unread', enum: ['unread', 'read'] })
  status: string;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
