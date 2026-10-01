import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  cvUrl: string;

  @Prop({ default: 'pending', enum: ['pending', 'reviewed', 'rejected', 'accepted'] })
  status: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
