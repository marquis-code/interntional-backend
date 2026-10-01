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
var JobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schemas/job.schema");
const application_schema_1 = require("./schemas/application.schema");
const pagination_util_1 = require("../utils/pagination.util");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let JobsService = JobsService_1 = class JobsService {
    jobModel;
    applicationModel;
    notificationsGateway;
    logger = new common_1.Logger(JobsService_1.name);
    constructor(jobModel, applicationModel, notificationsGateway) {
        this.jobModel = jobModel;
        this.applicationModel = applicationModel;
        this.notificationsGateway = notificationsGateway;
    }
    async findAll(params = {}) {
        const filter = params.status ? { status: params.status } : {};
        return (0, pagination_util_1.paginateQuery)(this.jobModel, filter, params, ['title', 'company', 'location', 'type']);
    }
    async create(jobDto) {
        const newJob = new this.jobModel(jobDto);
        const savedJob = await newJob.save();
        try {
            this.notificationsGateway.sendToAll({
                title: 'New Job Posted!',
                message: `${savedJob.title} at ${savedJob.company} is now available on the Career Hub.`,
                type: 'SYSTEM',
                link: '/dashboard/career',
                metadata: { jobId: savedJob._id }
            });
        }
        catch (err) {
            this.logger.error(`Failed to broadcast job announcement: ${err.message}`);
        }
        return savedJob;
    }
    async update(id, updateData) {
        return this.jobModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async remove(id) {
        return this.jobModel.findByIdAndDelete(id).exec();
    }
    async createApplication(data) {
        const newApp = new this.applicationModel(data);
        return newApp.save();
    }
    async getApplications(params = {}) {
        return (0, pagination_util_1.paginateQuery)(this.applicationModel, {}, params, ['jobTitle', 'name', 'email']);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = JobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __param(1, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notifications_gateway_1.NotificationsGateway])
], JobsService);
//# sourceMappingURL=jobs.service.js.map