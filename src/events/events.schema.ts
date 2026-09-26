import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;
export type EventRegistrationDocument = EventRegistration & Document;

@Schema({ timestamps: true })
export class EventRegistration {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  university: string;

  @Prop()
  programme: string;

  @Prop({ default: 'registered' })
  status: string; // registered, attended, cancelled

  @Prop()
  notes: string;
}

export const EventRegistrationSchema = SchemaFactory.createForClass(EventRegistration);

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  endDate: Date;

  @Prop()
  location: string;

  @Prop({ default: 'in-person' })
  type: string; // in-person, virtual, hybrid

  @Prop()
  meetingLink: string;

  @Prop({ default: 0 })
  capacity: number; // 0 = unlimited

  @Prop()
  coverImage: string;

  @Prop()
  speaker: string;

  @Prop({ default: 'upcoming' })
  status: string; // upcoming, past, cancelled

  @Prop({ default: true })
  registrationOpen: boolean;

  // Robust Event Fields
  @Prop({ default: 0 })
  price: number; // 0 for free

  @Prop({ default: false })
  isMembersOnly: boolean; // True if requires an active subscription

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [{ time: String, title: String, speaker: String }], default: [] })
  agenda: { time: string; title: string; speaker: string }[];

  @Prop({ type: [{ name: String, url: String }], default: [] })
  attachments: { name: string; url: string }[];

  @Prop({ type: [{ name: String, logo: String, website: String }], default: [] })
  sponsors: { name: string; logo: string; website: string }[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
