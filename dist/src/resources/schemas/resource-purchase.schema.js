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
exports.ResourcePurchaseSchema = exports.ResourcePurchase = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ResourcePurchase = class ResourcePurchase {
    user;
    resource;
    amountPaid;
    reference;
    status;
};
exports.ResourcePurchase = ResourcePurchase;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ResourcePurchase.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Resource', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ResourcePurchase.prototype, "resource", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ResourcePurchase.prototype, "amountPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ResourcePurchase.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'completed' }),
    __metadata("design:type", String)
], ResourcePurchase.prototype, "status", void 0);
exports.ResourcePurchase = ResourcePurchase = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ResourcePurchase);
exports.ResourcePurchaseSchema = mongoose_1.SchemaFactory.createForClass(ResourcePurchase);
//# sourceMappingURL=resource-purchase.schema.js.map