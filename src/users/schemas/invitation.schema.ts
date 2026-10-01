import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvitationDocument = Invitation & Document;

@Schema({ timestamps: true })
export class Invitation {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  adminPlatform: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ required: false })
  department?: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  isUsed: boolean;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
