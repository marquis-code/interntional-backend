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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resource_schema_1 = require("./schemas/resource.schema");
const resource_purchase_schema_1 = require("./schemas/resource-purchase.schema");
const storage_service_1 = require("../storage/storage.service");
const pagination_util_1 = require("../utils/pagination.util");
const axios_1 = __importDefault(require("axios"));
let ResourcesController = class ResourcesController {
    resourceModel;
    purchaseModel;
    storageService;
    constructor(resourceModel, purchaseModel, storageService) {
        this.resourceModel = resourceModel;
        this.purchaseModel = purchaseModel;
        this.storageService = storageService;
    }
    async findAll(queryParams) {
        const query = {};
        if (queryParams.category && queryParams.category !== 'All') {
            query.category = queryParams.category;
        }
        return (0, pagination_util_1.paginateQuery)(this.resourceModel, query, queryParams, ['title', 'description', 'category', 'fileType']);
    }
    async getSignedUrl(id, req) {
        const resource = await this.resourceModel.findById(id).exec();
        if (!resource)
            throw new Error('Resource not found');
        if (resource.isPremium) {
            const purchase = await this.purchaseModel.findOne({ user: new mongoose_2.Types.ObjectId(req.user._id || req.user.userId), resource: new mongoose_2.Types.ObjectId(id) });
            if (!purchase)
                throw new common_1.ForbiddenException('You must purchase this premium resource first.');
        }
        return { signedUrl: resource.fileUrl };
    }
    async buyPremiumResource(id, body, req) {
        const resource = await this.resourceModel.findById(id);
        if (!resource)
            throw new Error('Resource not found');
        if (!resource.isPremium)
            throw new common_1.BadRequestException('This resource is free');
        try {
            const paystackRes = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${body.reference}`, {
                headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
            });
            const data = paystackRes.data.data;
            if (data.status !== 'success')
                throw new common_1.BadRequestException('Transaction was not successful');
            if (data.amount < resource.price)
                throw new common_1.BadRequestException('Amount paid is less than price');
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to verify payment with Paystack');
        }
        const purchase = new this.purchaseModel({
            user: new mongoose_2.Types.ObjectId(req.user._id || req.user.userId),
            resource: new mongoose_2.Types.ObjectId(id),
            amountPaid: resource.price,
            reference: body.reference,
            status: 'completed'
        });
        await purchase.save();
        return { message: 'Purchase successful', signedUrl: resource.fileUrl };
    }
    async create(body, req) {
        const resource = new this.resourceModel({
            ...body,
            uploadedBy: req.user.userId,
        });
        return resource.save();
    }
    async remove(id) {
        await this.resourceModel.findByIdAndDelete(id).exec();
        return { message: 'Resource deleted successfully' };
    }
    async update(id, body) {
        const updated = await this.resourceModel.findByIdAndUpdate(id, { $set: body }, { new: true }).exec();
        if (!updated)
            throw new Error('Resource not found');
        return updated;
    }
    async partialUpdate(id, body) {
        const updated = await this.resourceModel.findByIdAndUpdate(id, { $set: body }, { new: true }).exec();
        if (!updated)
            throw new Error('Resource not found');
        return updated;
    }
};
exports.ResourcesController = ResourcesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/signed-url'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getSignedUrl", null);
__decorate([
    (0, common_1.Post)(':id/buy'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "buyPremiumResource", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "partialUpdate", null);
exports.ResourcesController = ResourcesController = __decorate([
    (0, common_1.Controller)('resources'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, mongoose_1.InjectModel)(resource_schema_1.Resource.name)),
    __param(1, (0, mongoose_1.InjectModel)(resource_purchase_schema_1.ResourcePurchase.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        storage_service_1.StorageService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map