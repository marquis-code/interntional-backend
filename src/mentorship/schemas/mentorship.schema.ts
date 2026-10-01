import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Mentorship extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  areaOfInterest: string;

  @Prop({ required: true, enum: ['universe', 'interntional'] })
  application: string;

  @Prop({ default: 'pending', enum: ['pending', 'matched', 'completed', 'cancelled'] })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Mentor' })
  matchedMentor: MongooseSchema.Types.ObjectId;

  @Prop()
  notes: string;
}

export const MentorshipSchema = SchemaFactory.createForClass(Mentorship);
