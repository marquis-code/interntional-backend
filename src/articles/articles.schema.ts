import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  category: string;

  @Prop([String])
  tags: string[];

  @Prop()
  coverImage: string;

  @Prop({ default: 'draft' })
  status: string; // published, draft, scheduled
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
