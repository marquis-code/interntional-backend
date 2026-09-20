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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_schema_1 = require("./subscription.schema");
let SubscriptionsService = class SubscriptionsService {
    subscriptionModel;
    constructor(subscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }
    async create(data) {
        return new this.subscriptionModel(data).save();
    }
    async findAll() {
        return this.subscriptionModel.find().sort({ price: 1 }).exec();
    }
    async findActive() {
        return this.subscriptionModel.find({ isActive: true }).sort({ price: 1 }).exec();
    }
    async findById(id) {
        const sub = await this.subscriptionModel.findById(id).exec();
        if (!sub)
            throw new common_1.NotFoundException('Subscription plan not found');
        return sub;
    }
    async update(id, data) {
        const sub = await this.subscriptionModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!sub)
            throw new common_1.NotFoundException('Subscription plan not found');
        return sub;
    }
    async delete(id) {
        const sub = await this.subscriptionModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
        if (!sub)
            throw new common_1.NotFoundException('Subscription plan not found');
        return sub;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_schema_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map