import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomRoleDocument = CustomRole & Document;

@Schema({ timestamps: true })
export class CustomRole {
  @Prop({ required: true, unique: true, uppercase: true })
  name: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export const CustomRoleSchema = SchemaFactory.createForClass(CustomRole);
