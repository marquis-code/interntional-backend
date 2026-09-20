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
exports.EnquirySchema = exports.Enquiry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Enquiry = class Enquiry extends mongoose_2.Document {
    name;
    email;
    message;
    status;
};
exports.Enquiry = Enquiry;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enquiry.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enquiry.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enquiry.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'unread', enum: ['unread', 'read'] }),
    __metadata("design:type", String)
], Enquiry.prototype, "status", void 0);
exports.Enquiry = Enquiry = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Enquiry);
exports.EnquirySchema = mongoose_1.SchemaFactory.createForClass(Enquiry);
//# sourceMappingURL=enquiry.schema.js.map