import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalyticsEventDocument = AnalyticsEvent & Document;

export enum EventType {
  PAGE_VIEW = 'page_view',
  LOGIN = 'login',
  DOWNLOAD = 'download',
  JOB_CLICK = 'job_click',
  ENQUIRY_SUBMIT = 'enquiry_submit',
  SIGNUP = 'signup',
  PAYMENT_INIT = 'payment_init',
  PAYMENT_SUCCESS = 'payment_success',
  DOCUMENT_UPLOAD = 'document_upload',
  VAULT_ACCESS = 'vault_access',
  MENTOR_CONNECT = 'mentor_connect',
}

@Schema({ timestamps: true })
export class AnalyticsEvent {
  @Prop({ required: true, enum: EventType })
  event: EventType;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  userId: Types.ObjectId;

  @Prop({ default: '' })
  page: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop({ default: '' })
  ipAddress: string;

  @Prop({ default: '' })
  userAgent: string;

  @Prop({ default: '' })
  department: string;
}

export const AnalyticsEventSchema = SchemaFactory.createForClass(AnalyticsEvent);
AnalyticsEventSchema.index({ event: 1, createdAt: -1 });
AnalyticsEventSchema.index({ userId: 1 });
AnalyticsEventSchema.index({ department: 1 });
