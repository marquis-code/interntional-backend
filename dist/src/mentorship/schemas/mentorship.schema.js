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
exports.MentorshipSchema = exports.Mentorship = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Mentorship = class Mentorship extends mongoose_2.Document {
    user;
    name;
    email;
    areaOfInterest;
    application;
    status;
    matchedMentor;
    notes;
};
exports.Mentorship = Mentorship;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Mentorship.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Mentorship.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Mentorship.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Mentorship.prototype, "areaOfInterest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['universe', 'interntional'] }),
    __metadata("design:type", String)
], Mentorship.prototype, "application", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'matched', 'completed', 'cancelled'] }),
    __metadata("design:type", String)
], Mentorship.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Mentor' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Mentorship.prototype, "matchedMentor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Mentorship.prototype, "notes", void 0);
exports.Mentorship = Mentorship = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Mentorship);
exports.MentorshipSchema = mongoose_1.SchemaFactory.createForClass(Mentorship);
//# sourceMappingURL=mentorship.schema.js.map