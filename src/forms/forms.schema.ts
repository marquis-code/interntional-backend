import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FormDocument = Form & Document;
export type FormSubmissionDocument = FormSubmission & Document;

@Schema()
export class FormField {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: ['text', 'textarea', 'email', 'number', 'select', 'checkbox', 'radio', 'file', 'date', 'url', 'phone', 'rich-text'] })
  type: string;

  @Prop({ default: false })
  required: boolean;

  @Prop()
  placeholder: string;

  @Prop({ type: [String] })
  options: string[]; // For select, radio, checkbox

  @Prop()
  helpText: string;

  @Prop({ default: 0 })
  order: number;

  @Prop()
  maxLength: number;

  @Prop()
  accept: string; // For file inputs: .pdf,.doc,.jpg

  @Prop()
  maxFileSize: number; // in MB
}

export const FormFieldSchema = SchemaFactory.createForClass(FormField);

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['registration', 'call-for-papers', 'article-submission', 'comic-strip-contest', 'abstract-submission', 'survey', 'feedback', 'custom'] })
  type: string;

  @Prop({ type: [FormFieldSchema], default: [] })
  fields: FormField[];

  @Prop({ type: Types.ObjectId, ref: 'Event' })
  linkedEvent: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme' })
  linkedProgramme: Types.ObjectId;

  @Prop({ default: 'draft', enum: ['active', 'closed', 'draft'] })
  status: string;

  @Prop()
  deadline: Date;

  @Prop()
  coverImage: string;

  @Prop({ default: true })
  allowMultipleSubmissions: boolean;

  @Prop()
  successMessage: string;

  @Prop()
  maxSubmissions: number; // 0 = unlimited
}

export const FormSchema = SchemaFactory.createForClass(Form);

@Schema({ timestamps: true })
export class FormSubmission {
  @Prop({ type: Types.ObjectId, ref: 'Form', required: true })
  formId: Types.ObjectId;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;

  @Prop()
  submitterEmail: string;

  @Prop()
  submitterName: string;

  @Prop({ default: 'submitted', enum: ['submitted', 'under-review', 'accepted', 'rejected'] })
  status: string;

  @Prop()
  reviewNotes: string;
}

export const FormSubmissionSchema = SchemaFactory.createForClass(FormSubmission);
