import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  bannerImage: string; // Optional banner image

  @Prop({ required: true })
  price: number; // Price in kobo (Paystack uses kobo for NGN)

  @Prop({ required: true, default: 1 })
  durationMonths: number;

  @Prop({ type: [String], default: [] })
  features: string[];

  // Robust Access Controls
  @Prop({ default: 0 })
  maxMentorshipRequests: number;

  @Prop({ default: false })
  canAccessVault: boolean;

  @Prop({ default: false })
  canPostArticles: boolean;

  @Prop({ default: false })
  canAccessGlobalCommunity: boolean;

  @Prop({ default: false })
  canAccessPremiumJobs: boolean;

  @Prop({ default: false })
  canMessageMentorsDirectly: boolean;

  @Prop({ default: false })
  resumeReviewIncluded: boolean;

  @Prop({ default: false })
  mockInterviewsIncluded: boolean;

  @Prop({ default: false })
  canAccessPremiumResources: boolean;

  @Prop({ default: 0 })
  eventDiscountPercentage: number;

  @Prop({ default: true })
  isActive: boolean;

  // Redesigned Selar Courses Section
  @Prop({ 
    type: [{ 
      category: String, 
      courses: [{ 
        title: String, 
        link: String, 
        description: String, 
        image: String 
      }] 
    }], 
    default: [] 
  })
  sellarCourses: { 
    category: string; 
    courses: { title: string; link: string; description?: string; image?: string }[] 
  }[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
