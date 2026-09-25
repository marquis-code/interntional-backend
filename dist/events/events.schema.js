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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = exports.Event = exports.EventRegistrationSchema = exports.EventRegistration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EventRegistration = class EventRegistration {
    eventId;
    fullName;
    email;
    phone;
    university;
    programme;
    status;
    notes;
};
exports.EventRegistration = EventRegistration;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Event', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EventRegistration.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EventRegistration.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EventRegistration.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventRegistration.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventRegistration.prototype, "university", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventRegistration.prototype, "programme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'registered' }),
    __metadata("design:type", String)
], EventRegistration.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventRegistration.prototype, "notes", void 0);
exports.EventRegistration = EventRegistration = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EventRegistration);
exports.EventRegistrationSchema = mongoose_1.SchemaFactory.createForClass(EventRegistration);
let Event = class Event {
    title;
    description;
    date;
    endDate;
    location;
    type;
    meetingLink;
    capacity;
    coverImage;
    speaker;
    status;
    registrationOpen;
};
exports.Event = Event;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'in-person' }),
    __metadata("design:type", String)
], Event.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "meetingLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "coverImage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "speaker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'upcoming' }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Event.prototype, "registrationOpen", void 0);
exports.Event = Event = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Event);
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=events.schema.js.map