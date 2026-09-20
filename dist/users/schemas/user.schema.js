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
exports.UserSchema = exports.User = exports.Permission = exports.Department = exports.UserStatus = exports.UserRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MODERATOR"] = "MODERATOR";
    UserRole["DEPARTMENT_HEAD"] = "DEPARTMENT_HEAD";
    UserRole["INTERN_MEMBER"] = "INTERN_MEMBER";
    UserRole["ALUMNI_MEMBER"] = "ALUMNI_MEMBER";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING"] = "PENDING";
    UserStatus["APPROVED"] = "APPROVED";
    UserStatus["REJECTED"] = "REJECTED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var Department;
(function (Department) {
    Department["HEMATOLOGY"] = "HEMATOLOGY";
    Department["CHEMICAL_PATHOLOGY"] = "CHEMICAL_PATHOLOGY";
    Department["MICROBIOLOGY"] = "MICROBIOLOGY";
    Department["HISTOPATHOLOGY"] = "HISTOPATHOLOGY";
    Department["MEDICAL_VIROLOGY"] = "MEDICAL_VIROLOGY";
    Department["GENERAL"] = "GENERAL";
})(Department || (exports.Department = Department = {}));
var Permission;
(function (Permission) {
    Permission["MANAGE_USERS"] = "manage_users";
    Permission["APPROVE_DOCUMENTS"] = "approve_documents";
    Permission["MANAGE_SUBSCRIPTIONS"] = "manage_subscriptions";
    Permission["MANAGE_PAYMENTS"] = "manage_payments";
    Permission["MANAGE_CONTENT"] = "manage_content";
    Permission["VIEW_ANALYTICS"] = "view_analytics";
    Permission["MANAGE_JOBS"] = "manage_jobs";
    Permission["MANAGE_ENQUIRIES"] = "manage_enquiries";
    Permission["MANAGE_ROLES"] = "manage_roles";
})(Permission || (exports.Permission = Permission = {}));
let User = class User {
    firstName;
    lastName;
    email;
    passwordHash;
    role;
    status;
    department;
    permissions;
    verificationFileUrl;
    subscriptionStartDate;
    subscriptionEndDate;
    isSubscriptionActive;
    lastLoginAt;
    loginCount;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: UserRole, default: UserRole.INTERN_MEMBER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: UserStatus, default: UserStatus.PENDING }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Department, default: Department.GENERAL }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "verificationFileUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], User.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], User.prototype, "subscriptionEndDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "loginCount", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ status: 1, role: 1 });
exports.UserSchema.index({ email: 1 });
exports.UserSchema.index({ department: 1 });
//# sourceMappingURL=user.schema.js.map