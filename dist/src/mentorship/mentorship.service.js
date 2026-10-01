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
exports.MentorshipService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mentorship_schema_1 = require("./schemas/mentorship.schema");
const mentor_schema_1 = require("./schemas/mentor.schema");
const mentor_category_schema_1 = require("./schemas/mentor-category.schema");
const notifications_service_1 = require("../notifications/notifications.service");
const email_service_1 = require("../utils/email.service");
let MentorshipService = class MentorshipService {
    mentorshipModel;
    mentorModel;
    mentorCategoryModel;
    notificationsService;
    emailService;
    constructor(mentorshipModel, mentorModel, mentorCategoryModel, notificationsService, emailService) {
        this.mentorshipModel = mentorshipModel;
        this.mentorModel = mentorModel;
        this.mentorCategoryModel = mentorCategoryModel;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
    async create(createMentorshipDto, userId) {
        const newMentorship = new this.mentorshipModel({
            ...createMentorshipDto,
            user: userId,
        });
        const saved = await newMentorship.save();
        if (userId) {
            await this.notificationsService.create({
                userId,
                title: 'Mentorship Request Submitted',
                message: 'Your mentorship request has been submitted and is pending mentor matching.',
                type: 'MENTORSHIP',
                link: '/dashboard/mentorship',
            }).catch(() => { });
        }
        return saved;
    }
    async findMyStatus(userId, application) {
        const query = { user: userId };
        if (application) {
            query.application = application;
        }
        const request = await this.mentorshipModel
            .findOne(query)
            .sort({ createdAt: -1 })
            .populate('matchedMentor')
            .exec();
        if (!request) {
            return { status: 'none' };
        }
        return {
            status: request.status,
            request,
            mentor: request.matchedMentor || null
        };
    }
    async findAll(params = {}, application) {
        const { page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const query = {};
        if (application) {
            query.application = application;
        }
        const [data, total] = await Promise.all([
            this.mentorshipModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).populate('user').populate('matchedMentor').exec(),
            this.mentorshipModel.countDocuments(query).exec(),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const request = await this.mentorshipModel.findById(id).populate('user').populate('matchedMentor').exec();
        if (!request)
            throw new common_1.NotFoundException('Mentorship request not found');
        return request;
    }
    async updateStatus(id, updateDto) {
        const oldRequest = await this.mentorshipModel.findById(id);
        if (!oldRequest)
            throw new common_1.NotFoundException('Mentorship request not found');
        const isNewlyMatched = updateDto.status === 'matched' && oldRequest.status !== 'matched' && updateDto.matchedMentor;
        const request = await this.mentorshipModel.findByIdAndUpdate(id, { $set: updateDto }, { new: true }).populate('user').populate('matchedMentor');
        if (!request)
            throw new common_1.NotFoundException('Mentorship request not found');
        if (request.user) {
            const targetUserId = typeof request.user === 'object' && request.user._id
                ? request.user._id.toString()
                : request.user.toString();
            await this.notificationsService.create({
                userId: targetUserId,
                title: `Mentorship Status: ${updateDto.status}`,
                message: `Your mentorship request status has been updated to "${updateDto.status}".`,
                type: 'MENTORSHIP',
                link: '/dashboard/mentorship',
            }).catch(() => { });
        }
        if (isNewlyMatched && request.matchedMentor) {
            const mentor = request.matchedMentor;
            const menteeName = request.name;
            const menteeEmail = request.email;
            const applicationType = request.application;
            await this.emailService.sendMentorshipMatchedEmailToMentee(menteeEmail, menteeName.split(' ')[0], mentor.name, mentor.email, applicationType);
            await this.emailService.sendMentorshipMatchedEmailToMentor(mentor.email, mentor.name.split(' ')[0], menteeName, menteeEmail, request.areaOfInterest, applicationType);
        }
        return request;
    }
    async remove(id) {
        const request = await this.mentorshipModel.findByIdAndDelete(id);
        if (!request)
            throw new common_1.NotFoundException('Mentorship request not found');
        return request;
    }
    async createMentor(createMentorDto) {
        const mentor = new this.mentorModel(createMentorDto);
        return mentor.save();
    }
    async findAllMentors() {
        return this.mentorModel.find().sort({ createdAt: -1 }).exec();
    }
    async updateMentor(id, updateMentorDto) {
        const mentor = await this.mentorModel.findByIdAndUpdate(id, updateMentorDto, { new: true });
        if (!mentor)
            throw new common_1.NotFoundException('Mentor not found');
        return mentor;
    }
    async removeMentor(id) {
        const mentor = await this.mentorModel.findByIdAndDelete(id);
        if (!mentor)
            throw new common_1.NotFoundException('Mentor not found');
        return mentor;
    }
    async createCategory(createCategoryDto) {
        const category = new this.mentorCategoryModel(createCategoryDto);
        return category.save();
    }
    async findAllCategories() {
        return this.mentorCategoryModel.find().sort({ name: 1 }).exec();
    }
    async removeCategory(id) {
        const category = await this.mentorCategoryModel.findByIdAndDelete(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
};
exports.MentorshipService = MentorshipService;
exports.MentorshipService = MentorshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mentorship_schema_1.Mentorship.name)),
    __param(1, (0, mongoose_1.InjectModel)(mentor_schema_1.Mentor.name)),
    __param(2, (0, mongoose_1.InjectModel)(mentor_category_schema_1.MentorCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], MentorshipService);
//# sourceMappingURL=mentorship.service.js.map