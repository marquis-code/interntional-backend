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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resource_schema_1 = require("./schemas/resource.schema");
const storage_service_1 = require("../storage/storage.service");
const pagination_util_1 = require("../utils/pagination.util");
let ResourcesController = class ResourcesController {
    resourceModel;
    storageService;
    constructor(resourceModel, storageService) {
        this.resourceModel = resourceModel;
        this.storageService = storageService;
    }
    async findAll(queryParams) {
        const query = {};
        if (queryParams.category && queryParams.category !== 'All') {
            query.category = queryParams.category;
        }
        return (0, pagination_util_1.paginateQuery)(this.resourceModel, query, queryParams, ['title', 'description', 'category', 'fileType']);
    }
    async getSignedUrl(id) {
        const resource = await this.resourceModel.findById(id).exec();
        if (!resource)
            throw new Error('Resource not found');
        return { signedUrl: resource.fileUrl };
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getSignedUrl", null);
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
exports.ResourcesController = ResourcesController = __decorate([
    (0, common_1.Controller)('resources'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, mongoose_1.InjectModel)(resource_schema_1.Resource.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        storage_service_1.StorageService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map