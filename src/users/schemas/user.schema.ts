import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  DEPARTMENT_HEAD = 'DEPARTMENT_HEAD',
  INTERN_MEMBER = 'INTERN_MEMBER',
  ALUMNI_MEMBER = 'ALUMNI_MEMBER',
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum Department {
  HEMATOLOGY = 'HEMATOLOGY',
  CHEMICAL_PATHOLOGY = 'CHEMICAL_PATHOLOGY',
  MICROBIOLOGY = 'MICROBIOLOGY',
  HISTOPATHOLOGY = 'HISTOPATHOLOGY',
  MEDICAL_VIROLOGY = 'MEDICAL_VIROLOGY',
  GENERAL = 'GENERAL',
}

export enum Permission {
  MANAGE_USERS = 'manage_users',
  APPROVE_DOCUMENTS = 'approve_documents',
  MANAGE_SUBSCRIPTIONS = 'manage_subscriptions',
  MANAGE_PAYMENTS = 'manage_payments',
  MANAGE_CONTENT = 'manage_content',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_JOBS = 'manage_jobs',
  MANAGE_ENQUIRIES = 'manage_enquiries',
  MANAGE_ROLES = 'manage_roles',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  passwordHash: string;

  @Prop({ required: false })
  setupPasswordToken: string;

  @Prop({ required: false })
  setupPasswordExpires: Date;

  @Prop({ required: true, enum: UserRole, default: UserRole.INTERN_MEMBER })
  role: UserRole;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Prop({ enum: Department, default: Department.GENERAL })
  department: Department;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ required: true })
  verificationFileUrl: string; // URL to the uploaded ID/Letter

  @Prop({ default: null })
  subscriptionStartDate: Date;

  @Prop({ default: null })
  subscriptionEndDate: Date;

  @Prop({ default: false })
  isSubscriptionActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Subscription', default: null })
  activeSubscription: Types.ObjectId;

  @Prop({ default: null })
  lastLoginAt: Date;

  @Prop({ default: 0 })
  loginCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add indexes for much faster lookups by status and role
UserSchema.index({ status: 1, role: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ department: 1 });
