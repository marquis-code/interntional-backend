import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteSettingsDocument = SiteSettings & Document;

@Schema({ _id: false })
export class MetricItem {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  label: string;
}

export const MetricItemSchema = SchemaFactory.createForClass(MetricItem);

@Schema({ _id: false })
export class StatsConfig {
  @Prop({ default: false })
  enabled: boolean;

  @Prop({ default: 'Platform Impact & Milestones' })
  title: string;

  @Prop({ type: [MetricItemSchema], default: [] })
  metrics: MetricItem[];
}

export const StatsConfigSchema = SchemaFactory.createForClass(StatsConfig);

@Schema({ _id: false })
export class SectionsConfig {
  @Prop({ default: false })
  stats: boolean;

  @Prop({ default: true })
  articles: boolean;

  @Prop({ default: true })
  testimonials: boolean;

  @Prop({ default: true })
  mentorship: boolean;

  @Prop({ default: true })
  career: boolean;

  @Prop({ default: true })
  events: boolean;

  @Prop({ default: true })
  pricing: boolean;

  @Prop({ default: false })
  cvUploadMandatory: boolean;
}

export const SectionsConfigSchema = SchemaFactory.createForClass(SectionsConfig);

@Schema({ timestamps: true, strict: false })
export class SiteSettings {
  @Prop({ required: true, unique: true, index: true })
  platform: string; // 'universe' | 'interntional'

  @Prop({ type: StatsConfigSchema, default: () => ({}) })
  stats: StatsConfig;

  @Prop({ type: SectionsConfigSchema, default: () => ({}) })
  sections: SectionsConfig;

  @Prop({ type: Object, default: {} })
  customConfig: Record<string, any>;
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);
