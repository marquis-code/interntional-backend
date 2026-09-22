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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("./users.service");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../auth/decorators");
const user_schema_1 = require("./schemas/user.schema");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getPending(query) {
        return this.usersService.findPendingUsers(query);
    }
    async getApproved(query) {
        return this.usersService.findApprovedUsers(query);
    }
    async getAll(query) {
        return this.usersService.findAllUsers(query);
    }
    async getStats() {
        return this.usersService.getStats();
    }
    async getMentors() {
        return this.usersService.findMentors();
    }
    async getByDepartment(department) {
        return this.usersService.findByDepartment(department);
    }
    async approve(id) {
        return this.usersService.approveUser(id);
    }
    async reject(id) {
        return this.usersService.rejectUser(id);
    }
    async revoke(id) {
        return this.usersService.rejectUser(id);
    }
    async updateRole(id, role) {
        return this.usersService.updateRole(id, role);
    }
    async updateDepartment(id, department) {
        return this.usersService.updateDepartment(id, department);
    }
    async updatePermissions(id, permissions) {
        return this.usersService.updatePermissions(id, permissions);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MODERATOR),
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPending", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MODERATOR),
    (0, common_1.Get)('approved'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getApproved", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStats", null);
__decorate([
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)('mentors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMentors", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.DEPARTMENT_HEAD),
    (0, common_1.Get)('department/:department'),
    __param(0, (0, common_1.Param)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByDepartment", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MODERATOR),
    (0, common_1.Patch)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "approve", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MODERATOR),
    (0, common_1.Patch)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "reject", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    (0, common_1.Patch)(':id/revoke'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "revoke", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN),
    (0, common_1.Patch)(':id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN, user_schema_1.UserRole.ADMIN),
    (0, common_1.Patch)(':id/department'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateDepartment", null);
__decorate([
    (0, decorators_1.Roles)(user_schema_1.UserRole.SUPER_ADMIN),
    (0, common_1.Patch)(':id/permissions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePermissions", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map