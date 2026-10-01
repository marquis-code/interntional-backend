import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number; // in Kobo, 0 means free

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: Types.ObjectId;

  @Prop({ required: false })
  coverImage: string;

  @Prop({ required: true })
  fileUrl: string; // link to Cloudinary or AWS for the actual file

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['internTional', 'uniVerse'] })
  environment: string;

  @Prop({ default: false })
  isApproved: boolean; // Needs admin approval before showing

  @Prop({ default: 0 })
  salesCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
