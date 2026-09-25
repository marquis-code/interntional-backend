"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const events_schema_1 = require("./events.schema");
let EventsService = class EventsService {
    eventModel;
    registrationModel;
    constructor(eventModel, registrationModel) {
        this.eventModel = eventModel;
        this.registrationModel = registrationModel;
    }
    async getEvents() { return this.eventModel.find().sort({ date: -1 }).exec(); }
    async getEvent(id) { return this.eventModel.findById(id).exec(); }
    async createEvent(data) { return this.eventModel.create(data); }
    async updateEvent(id, data) { return this.eventModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
    async deleteEvent(id) {
        await this.registrationModel.deleteMany({ eventId: id }).exec();
        return this.eventModel.findByIdAndDelete(id).exec();
    }
    async registerForEvent(eventId, data) {
        const event = await this.eventModel.findById(eventId).exec();
        if (!event)
            throw new Error('Event not found');
        if (!event.registrationOpen)
            throw new Error('Registration is closed');
        if (event.capacity > 0) {
            const count = await this.registrationModel.countDocuments({ eventId }).exec();
            if (count >= event.capacity)
                throw new Error('Event is full');
        }
        const existing = await this.registrationModel.findOne({ eventId, email: data.email }).exec();
        if (existing)
            throw new Error('Already registered with this email');
        return this.registrationModel.create({ ...data, eventId });
    }
    async getRegistrations(eventId) {
        return this.registrationModel.find({ eventId }).sort({ createdAt: -1 }).exec();
    }
    async getRegistrationCount(eventId) {
        return this.registrationModel.countDocuments({ eventId }).exec();
    }
    async getRegistrationCounts() {
        return this.registrationModel.aggregate([
            { $group: { _id: '$eventId', count: { $sum: 1 } } }
        ]).exec();
    }
    async deleteRegistration(id) {
        return this.registrationModel.findByIdAndDelete(id).exec();
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(events_schema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(events_schema_1.EventRegistration.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map