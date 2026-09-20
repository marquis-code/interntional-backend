import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string; // e.g. Study Guide, Clinical, Video, Past Questions

  @Prop({ required: true })
  type: string; // e.g. PDF, MP4, DOCX

  @Prop({ required: true })
  fileUrl: string; // Cloudinary secure_url

  @Prop({ required: true })
  uploadedBy: string; // Admin User ID
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);

// Add compound index for faster category filtering and sorting
ResourceSchema.index({ category: 1, createdAt: -1 });
