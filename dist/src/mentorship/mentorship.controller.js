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
exports.MentorshipController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mentorship_service_1 = require("./mentorship.service");
const create_mentorship_dto_1 = require("./dto/create-mentorship.dto");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../auth/decorators");
const user_schema_1 = require("../users/schemas/user.schema");
let MentorshipController = class MentorshipController {
    mentorshipService;
    constructor(mentorshipService) {
        this.mentorshipService = mentorshipService;
    }
    create(createMentorshipDto, req) {
        return this.mentorshipService.create(createMentorshipDto, req.user.userId);
    }
    findMyStatus(req, application) {
        return this.mentorshipService.findMyStatus(req.user.userId, application);
    }
    findAll(page, limit, application) {
        return this.mentorshipService.findAll({ page: Number(page) || 1, limit: Number(limit) || 10 }, application);
    }
    findOne(id) {
        return this.mentorshipService.findOne(id);
    }
    updateStatus(id, updateDto) {
        return this.mentorshipService.updateStatus(id, updateDto);
    }
    remove(id) {
        return this.mentorshipService.remove(id);
    }
    createMentor(body) {
        return this.mentorshipService.createMentor(body);
    }
    findAllMentors() {
        return this.mentorshipService.findAllMentors();
    }
    updateMentor(id, body) {
        return this.mentorshipService.updateMentor(id, body);
    }
    removeMentor(id) {
        return this.mentorshipService.removeMentor(id);
    }
    createCategory(body) {
        return this.mentorshipService.createCategory(body);
    }
    findAllCategories() {
        return this.mentorshipService.findAllCategories();
    }
    removeCategory(id) {
        return this.mentorshipService.removeCategory(id);
    }
};
exports.MentorshipController = MentorshipController;
__decorate([
    (0, common_1.Post)('request'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mentorship_dto_1.CreateMentorshipDto, Object]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my-status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('application')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "findMyStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('application')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_mentorship_dto_1.UpdateMentorshipStatusDto]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('mentors'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "createMentor", null);
__decorate([
    (0, common_1.Get)('mentors/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "findAllMentors", null);
__decorate([
    (0, common_1.Patch)('mentors/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "updateMentor", null);
__decorate([
    (0, common_1.Delete)('mentors/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "removeMentor", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "removeCategory", null);
exports.MentorshipController = MentorshipController = __decorate([
    (0, common_1.Controller)('mentorship'),
    __metadata("design:paramtypes", [mentorship_service_1.MentorshipService])
], MentorshipController);
//# sourceMappingURL=mentorship.controller.js.map