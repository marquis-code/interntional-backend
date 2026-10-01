import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Mentor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  bio: string;

  @Prop({ required: true })
  areaOfInterest: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
