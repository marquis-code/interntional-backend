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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = UsersService_1 = class UsersService {
    userModel;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async create(userDto) {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }
    async findPendingUsers() {
        return this.userModel.find({ status: user_schema_1.UserStatus.PENDING }).lean().exec();
    }
    async findApprovedUsers() {
        return this.userModel.find({
            status: user_schema_1.UserStatus.APPROVED,
            role: { $ne: user_schema_1.UserRole.SUPER_ADMIN }
        }).select('-passwordHash').lean().exec();
    }
    async findAllUsers() {
        return this.userModel.find({
            role: { $ne: user_schema_1.UserRole.SUPER_ADMIN }
        }).select('-passwordHash').lean().exec();
    }
    async findMentors() {
        return this.userModel.find({
            status: user_schema_1.UserStatus.APPROVED,
            role: user_schema_1.UserRole.ALUMNI_MEMBER
        }).select('-passwordHash').lean().exec();
    }
    async findByDepartment(department) {
        return this.userModel.find({
            department: department,
            status: user_schema_1.UserStatus.APPROVED,
        }).select('-passwordHash').lean().exec();
    }
    async approveUser(id) {
        return this.userModel.findByIdAndUpdate(id, {
            $set: {
                status: user_schema_1.UserStatus.APPROVED,
                subscriptionStartDate: new Date(),
            },
        }, { new: true }).exec();
    }
    async rejectUser(id) {
        return this.userModel.findByIdAndUpdate(id, { $set: { status: user_schema_1.UserStatus.REJECTED } }, { new: true }).exec();
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
    async activateSubscription(userId, durationMonths) {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setMonth(endDate.getMonth() + durationMonths);
        const user = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                isSubscriptionActive: true,
                subscriptionStartDate: now,
                subscriptionEndDate: endDate,
            },
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map