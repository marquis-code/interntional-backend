import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string; // URL to apply
}

export const JobSchema = SchemaFactory.createForClass(Job);

// Add index for faster sorting by creation date
JobSchema.index({ createdAt: -1 });
