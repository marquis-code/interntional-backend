import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Enquiry extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  topic?: string;

  @Prop()
  userType?: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'universe' })
  application: string;

  @Prop({ default: 'unread', enum: ['unread', 'read'] })
  status: string;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
