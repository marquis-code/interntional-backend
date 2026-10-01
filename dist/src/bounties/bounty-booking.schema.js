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
exports.BountyBookingSchema = exports.BountyBooking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BountyBooking = class BountyBooking {
    client;
    bounty;
    amountPaid;
    reference;
    status;
    clientNotes;
};
exports.BountyBooking = BountyBooking;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BountyBooking.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Bounty', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BountyBooking.prototype, "bounty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BountyBooking.prototype, "amountPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BountyBooking.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], BountyBooking.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], BountyBooking.prototype, "clientNotes", void 0);
exports.BountyBooking = BountyBooking = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BountyBooking);
exports.BountyBookingSchema = mongoose_1.SchemaFactory.createForClass(BountyBooking);
//# sourceMappingURL=bounty-booking.schema.js.map