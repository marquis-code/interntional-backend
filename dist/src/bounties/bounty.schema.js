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
exports.BountySchema = exports.Bounty = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Bounty = class Bounty {
    title;
    description;
    price;
    provider;
    category;
    environment;
    isActive;
    bookingsCount;
};
exports.Bounty = Bounty;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bounty.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bounty.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Bounty.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Bounty.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['cv_review', 'mock_interview', 'career_planning', 'freelance_consulting'] }),
    __metadata("design:type", String)
], Bounty.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['internTional', 'uniVerse'] }),
    __metadata("design:type", String)
], Bounty.prototype, "environment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Bounty.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Bounty.prototype, "bookingsCount", void 0);
exports.Bounty = Bounty = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Bounty);
exports.BountySchema = mongoose_1.SchemaFactory.createForClass(Bounty);
//# sourceMappingURL=bounty.schema.js.map