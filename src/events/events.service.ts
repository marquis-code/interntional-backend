import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument, EventRegistration, EventRegistrationDocument } from './events.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(EventRegistration.name) private registrationModel: Model<EventRegistrationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // ---- Events CRUD ----
  async getEvents() { return this.eventModel.find().sort({ date: -1 }).exec(); }
  async getEvent(id: string) { return this.eventModel.findById(id).exec(); }
  async createEvent(data: any) { return this.eventModel.create(data); }
  async updateEvent(id: string, data: any) { return this.eventModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteEvent(id: string) { 
    await this.registrationModel.deleteMany({ eventId: id }).exec();
    return this.eventModel.findByIdAndDelete(id).exec(); 
  }

  // ---- Registrations ----
  async registerForEvent(eventId: string, data: any) {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) throw new Error('Event not found');
    if (!event.registrationOpen) throw new Error('Registration is closed');
    
    if (event.isMembersOnly) {
      const user = await this.userModel.findOne({ email: data.email }).exec();
      if (!user) throw new Error('This event is restricted to members only.');
      if (!user.isSubscriptionActive) throw new Error('An active premium subscription is required to register for this event.');
    }
    
    // Check capacity
    if (event.capacity > 0) {
      const count = await this.registrationModel.countDocuments({ eventId }).exec();
      if (count >= event.capacity) throw new Error('Event is full');
    }

    // Check duplicate email
    const existing = await this.registrationModel.findOne({ eventId, email: data.email }).exec();
    if (existing) throw new Error('Already registered with this email');

    return this.registrationModel.create({ ...data, eventId });
  }

  async getRegistrations(eventId: string) {
    return this.registrationModel.find({ eventId }).sort({ createdAt: -1 }).exec();
  }

  async getRegistrationCount(eventId: string) {
    return this.registrationModel.countDocuments({ eventId }).exec();
  }

  async getRegistrationCounts() {
    return this.registrationModel.aggregate([
      { $group: { _id: '$eventId', count: { $sum: 1 } } }
    ]).exec();
  }

  async deleteRegistration(id: string) {
    return this.registrationModel.findByIdAndDelete(id).exec();
  }
}
