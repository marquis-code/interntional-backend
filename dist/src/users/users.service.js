"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const user_schema_1 = require("./schemas/user.schema");
const invitation_schema_1 = require("./schemas/invitation.schema");
const custom_role_schema_1 = require("./schemas/custom-role.schema");
const pagination_util_1 = require("../utils/pagination.util");
const email_service_1 = require("../utils/email.service");
const notifications_service_1 = require("../notifications/notifications.service");
const crypto = __importStar(require("crypto"));
let UsersService = UsersService_1 = class UsersService {
    userModel;
    invitationModel;
    customRoleModel;
    emailService;
    notificationsService;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(userModel, invitationModel, customRoleModel, emailService, notificationsService) {
        this.userModel = userModel;
        this.invitationModel = invitationModel;
        this.customRoleModel = customRoleModel;
        this.emailService = emailService;
        this.notificationsService = notificationsService;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async findByIdWithSubscription(id) {
        return this.userModel.findById(id).populate('activeSubscription').select('-passwordHash').exec();
    }
    async findBySetupToken(token) {
        return this.userModel.findOne({
            setupPasswordToken: token,
            setupPasswordExpires: { $gt: new Date() }
        }).exec();
    }
    async updatePasswordAndActivate(id, passwordHash) {
        return this.userModel.findByIdAndUpdate(id, {
            $set: { passwordHash },
            $unset: { setupPasswordToken: 1, setupPasswordExpires: 1 }
        }, { new: true }).exec();
    }
    async createAdminInvitation(dto) {
        const existingUser = await this.userModel.findOne({ email: dto.email }).exec();
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists.');
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const invite = new this.invitationModel({
            email: dto.email,
            role: dto.role,
            adminPlatform: dto.adminPlatform,
            permissions: dto.permissions,
            token,
            expiresAt,
        });
        await invite.save();
        const link = `http://localhost:3000/accept-invite?token=${token}`;
        this.logger.log(`Generated Admin Invite Link: ${link}`);
        return invite;
    }
    async createCustomRole(name, permissions) {
        const existing = await this.customRoleModel.findOne({ name: name.toUpperCase() }).exec();
        if (existing) {
            existing.permissions = permissions;
            return existing.save();
        }
        const role = new this.customRoleModel({ name, permissions });
        return role.save();
    }
    async getCustomRoles() {
        return this.customRoleModel.find().exec();
    }
    async getAdminInvitations() {
        return this.invitationModel.find({ isUsed: false, expiresAt: { $gt: new Date() } }).exec();
    }
    async validateInvitation(token) {
        const invite = await this.invitationModel.findOne({ token, isUsed: false, expiresAt: { $gt: new Date() } }).exec();
        if (!invite) {
            throw new common_1.BadRequestException('Invalid or expired invitation token.');
        }
        return invite;
    }
    async consumeInvitation(token) {
        await this.invitationModel.updateOne({ token }, { $set: { isUsed: true } }).exec();
    }
    async setResetPasswordToken(email, token, expires) {
        return this.userModel.findOneAndUpdate({ email }, { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }, { new: true }).exec();
    }
    async findByResetToken(token) {
        return this.userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        }).exec();
    }
    async resetPassword(id, passwordHash) {
        return this.userModel.findByIdAndUpdate(id, {
            $set: { passwordHash },
            $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 }
        }, { new: true }).exec();
    }
    async create(userDto) {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }
    async getUserDashboardStats(userId) {
        return {
            documentsUploaded: Math.floor(Math.random() * 20) + 1,
            mentorshipSessions: Math.floor(Math.random() * 10),
            jobsApplied: Math.floor(Math.random() * 5),
        };
    }
    async findPendingUsers(params = {}) {
        const query = { status: user_schema_1.UserStatus.PENDING };
        return (0, pagination_util_1.paginateQuery)(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
    }
    async findApprovedUsers(params = {}) {
        const query = {
            status: user_schema_1.UserStatus.APPROVED,
            role: { $ne: user_schema_1.UserRole.SUPER_ADMIN }
        };
        return (0, pagination_util_1.paginateQuery)(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
    }
    async findAllUsers(params = {}) {
        const query = {
            role: { $ne: user_schema_1.UserRole.SUPER_ADMIN }
        };
        return (0, pagination_util_1.paginateQuery)(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
    }
    async findMentors(params = {}) {
        const query = {
            status: user_schema_1.UserStatus.APPROVED,
            role: user_schema_1.UserRole.ALUMNI_MEMBER
        };
        return (0, pagination_util_1.paginateQuery)(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
    }
    async findByDepartment(department) {
        return this.userModel.find({
            department: department,
            status: user_schema_1.UserStatus.APPROVED,
        }).select('-passwordHash').lean().exec();
    }
    async approveUser(id) {
        const userToApprove = await this.userModel.findById(id).exec();
        if (!userToApprove)
            return null;
        let updateData = {
            status: user_schema_1.UserStatus.APPROVED,
            subscriptionStartDate: new Date(),
        };
        let setupToken;
        if (!userToApprove.passwordHash) {
            setupToken = crypto.randomBytes(32).toString('hex');
            const expires = new Date();
            expires.setHours(expires.getHours() + 48);
            updateData.setupPasswordToken = setupToken;
            updateData.setupPasswordExpires = expires;
        }
        const user = await this.userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
        if (user) {
            await this.emailService.sendAccountApprovedEmail(user.email, user.firstName, setupToken, user.role === user_schema_1.UserRole.INTERN_MEMBER ? 'intern' : 'universe');
            await this.notificationsService.create({
                userId: user._id.toString(),
                title: 'Application Approved! 🎉',
                message: 'Congratulations! Your verification has been approved. You now have full access to your ecosystem.',
                type: 'APPROVAL',
                link: '/dashboard/overview',
            }).catch((err) => this.logger.error(`Notification error on approval: ${err.message}`));
        }
        return user;
    }
    async rejectUser(id) {
        const user = await this.userModel.findByIdAndUpdate(id, { $set: { status: user_schema_1.UserStatus.REJECTED } }, { new: true }).exec();
        if (user) {
            await this.emailService.sendAccountRejectedEmail(user.email, user.firstName);
            await this.notificationsService.create({
                userId: user._id.toString(),
                title: 'Application Status Update',
                message: 'Your verification documents were reviewed. Please contact support or update your application.',
                type: 'APPROVAL',
            }).catch((err) => this.logger.error(`Notification error on rejection: ${err.message}`));
        }
        return user;
    }
    async updateRole(id, role) {
        const validRoles = Object.values(user_schema_1.UserRole);
        if (!validRoles.includes(role)) {
            throw new common_1.BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
        }
        const user = await this.userModel.findByIdAndUpdate(id, { $set: { role } }, { new: true }).select('-passwordHash').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateDepartment(id, department) {
        const validDepts = Object.values(user_schema_1.Department);
        if (!validDepts.includes(department)) {
            throw new common_1.BadRequestException(`Invalid department. Must be one of: ${validDepts.join(', ')}`);
        }
        const user = await this.userModel.findByIdAndUpdate(id, { $set: { department } }, { new: true }).select('-passwordHash').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updatePermissions(id, permissions) {
        const validPerms = Object.values(user_schema_1.Permission);
        const invalid = permissions.filter(p => !validPerms.includes(p));
        if (invalid.length > 0) {
            throw new common_1.BadRequestException(`Invalid permissions: ${invalid.join(', ')}. Must be one of: ${validPerms.join(', ')}`);
        }
        const user = await this.userModel.findByIdAndUpdate(id, { $set: { permissions } }, { new: true }).select('-passwordHash').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async trackLogin(id) {
        await this.userModel.findByIdAndUpdate(id, {
            $set: { lastLoginAt: new Date() },
            $inc: { loginCount: 1 },
        }).exec();
    }
    async activateSubscription(userId, subscriptionId, durationMonths, authCode) {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setMonth(endDate.getMonth() + durationMonths);
        const updateData = {
            isSubscriptionActive: true,
            activeSubscription: subscriptionId,
            subscriptionStartDate: now,
            subscriptionEndDate: endDate,
        };
        if (authCode) {
            updateData.paystackAuthCode = authCode;
        }
        const user = await this.userModel.findByIdAndUpdate(userId, {
            $set: updateData,
        }, { new: true }).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const SubscriptionModel = this.userModel.db.model('Subscription');
        const plan = await SubscriptionModel.findById(subscriptionId).exec();
        if (plan) {
            const source = user.universityId ? 'universe' : 'intern';
            await this.emailService.sendSubscriptionActivatedEmail(user.email, user.firstName, plan.name, source);
        }
        return user;
    }
    async cancelSubscription(userId) {
        const user = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                isSubscriptionActive: false,
            },
            $unset: {
                paystackAuthCode: 1,
            }
        }, { new: true }).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async getStats() {
        const [totalUsers, pendingUsers, approvedUsers, rejectedUsers, activeSubscriptions, roleBreakdown, departmentBreakdown, recentSignups,] = await Promise.all([
            this.userModel.countDocuments().exec(),
            this.userModel.countDocuments({ status: user_schema_1.UserStatus.PENDING }).exec(),
            this.userModel.countDocuments({ status: user_schema_1.UserStatus.APPROVED }).exec(),
            this.userModel.countDocuments({ status: user_schema_1.UserStatus.REJECTED }).exec(),
            this.userModel.countDocuments({ isSubscriptionActive: true }).exec(),
            this.userModel.aggregate([
                { $match: { role: { $ne: user_schema_1.UserRole.SUPER_ADMIN } } },
                { $group: { _id: '$role', count: { $sum: 1 } } },
            ]).exec(),
            this.userModel.aggregate([
                { $match: { status: user_schema_1.UserStatus.APPROVED } },
                { $group: { _id: '$department', count: { $sum: 1 } } },
            ]).exec(),
            this.userModel.countDocuments({
                createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            }).exec(),
        ]);
        return {
            totalUsers,
            pendingUsers,
            approvedUsers,
            rejectedUsers,
            activeSubscriptions,
            recentSignups,
            roleBreakdown: roleBreakdown.reduce((acc, r) => { acc[r._id] = r.count; return acc; }, {}),
            departmentBreakdown: departmentBreakdown.reduce((acc, d) => { acc[d._id] = d.count; return acc; }, {}),
        };
    }
    async handleSubscriptionCaps() {
        this.logger.debug('Running daily check for 2-Year Cap Rule on Interns...');
        const twoYearsAgo = new Date();
        twoYearsAgo.setMonth(twoYearsAgo.getMonth() - 24);
        const expiredInterns = await this.userModel.find({
            role: user_schema_1.UserRole.INTERN_MEMBER,
            subscriptionStartDate: { $lte: twoYearsAgo }
        }).exec();
        if (expiredInterns.length > 0) {
            this.logger.log(`Found ${expiredInterns.length} interns who have reached their 2-year cap. Transitioning to Alumni...`);
            const bulkOps = expiredInterns.map(user => ({
                updateOne: {
                    filter: { _id: user._id },
                    update: { $set: { role: user_schema_1.UserRole.ALUMNI_MEMBER } }
                }
            }));
            await this.userModel.bulkWrite(bulkOps);
            this.logger.log(`Successfully transitioned ${expiredInterns.length} users to Alumni status.`);
        }
        else {
            this.logger.debug('No interns have reached the 2-year cap today.');
        }
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "handleSubscriptionCaps", null);
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(invitation_schema_1.Invitation.name)),
    __param(2, (0, mongoose_1.InjectModel)(custom_role_schema_1.CustomRole.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        email_service_1.EmailService,
        notifications_service_1.NotificationsService])
], UsersService);
//# sourceMappingURL=users.service.js.map