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
exports.BountiesController = void 0;
const common_1 = require("@nestjs/common");
const bounties_service_1 = require("./bounties.service");
const dto_1 = require("./dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
let BountiesController = class BountiesController {
    bountiesService;
    constructor(bountiesService) {
        this.bountiesService = bountiesService;
    }
    async getBounties(environment, category) {
        return await this.bountiesService.getBounties(environment, category);
    }
    async createBounty(req, dto) {
        return await this.bountiesService.createBounty(req.user._id, dto);
    }
    async bookBounty(req, dto) {
        return await this.bountiesService.bookBounty(req.user._id, dto);
    }
    async getMyBookings(req) {
        return await this.bountiesService.getMyBookings(req.user._id);
    }
};
exports.BountiesController = BountiesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('environment')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BountiesController.prototype, "getBounties", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateBountyDto]),
    __metadata("design:returntype", Promise)
], BountiesController.prototype, "createBounty", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.BookBountyDto]),
    __metadata("design:returntype", Promise)
], BountiesController.prototype, "bookBounty", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Get)('my-bookings'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BountiesController.prototype, "getMyBookings", null);
exports.BountiesController = BountiesController = __decorate([
    (0, common_1.Controller)('bounties'),
    __metadata("design:paramtypes", [bounties_service_1.BountiesService])
], BountiesController);
//# sourceMappingURL=bounties.controller.js.map