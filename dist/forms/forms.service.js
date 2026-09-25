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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const forms_schema_1 = require("./forms.schema");
let FormsService = class FormsService {
    formModel;
    submissionModel;
    constructor(formModel, submissionModel) {
        this.formModel = formModel;
        this.submissionModel = submissionModel;
    }
    async getForms() { return this.formModel.find().sort({ createdAt: -1 }).populate('linkedEvent').populate('linkedProgramme').exec(); }
    async getForm(id) { return this.formModel.findById(id).populate('linkedEvent').populate('linkedProgramme').exec(); }
    async createForm(data) { return this.formModel.create(data); }
    async updateForm(id, data) { return this.formModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
    async deleteForm(id) {
        await this.submissionModel.deleteMany({ formId: id }).exec();
        return this.formModel.findByIdAndDelete(id).exec();
    }
    async submitForm(formId, data) {
        const form = await this.formModel.findById(formId).exec();
        if (!form)
            throw new Error('Form not found');
        if (form.status !== 'active')
            throw new Error('This form is not accepting submissions');
        if (form.deadline && new Date() > new Date(form.deadline))
            throw new Error('Submission deadline has passed');
        if (form.maxSubmissions && form.maxSubmissions > 0) {
            const count = await this.submissionModel.countDocuments({ formId }).exec();
            if (count >= form.maxSubmissions)
                throw new Error('Maximum submissions reached');
        }
        if (!form.allowMultipleSubmissions && data.submitterEmail) {
            const existing = await this.submissionModel.findOne({ formId, submitterEmail: data.submitterEmail }).exec();
            if (existing)
                throw new Error('You have already submitted this form');
        }
        return this.submissionModel.create({
            formId,
            data: data.data,
            submitterEmail: data.submitterEmail,
            submitterName: data.submitterName,
        });
    }
    async getSubmissions(formId) {
        return this.submissionModel.find({ formId }).sort({ createdAt: -1 }).exec();
    }
    async getSubmissionCount(formId) {
        return this.submissionModel.countDocuments({ formId }).exec();
    }
    async getSubmissionCounts() {
        return this.submissionModel.aggregate([
            { $group: { _id: '$formId', count: { $sum: 1 } } }
        ]).exec();
    }
    async updateSubmission(id, data) {
        return this.submissionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteSubmission(id) {
        return this.submissionModel.findByIdAndDelete(id).exec();
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(forms_schema_1.Form.name)),
    __param(1, (0, mongoose_1.InjectModel)(forms_schema_1.FormSubmission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FormsService);
//# sourceMappingURL=forms.service.js.map