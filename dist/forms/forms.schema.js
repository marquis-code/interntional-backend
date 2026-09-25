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
exports.FormSubmissionSchema = exports.FormSubmission = exports.FormSchema = exports.Form = exports.FormFieldSchema = exports.FormField = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FormField = class FormField {
    label;
    type;
    required;
    placeholder;
    options;
    helpText;
    order;
    maxLength;
    accept;
    maxFileSize;
};
exports.FormField = FormField;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FormField.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['text', 'textarea', 'email', 'number', 'select', 'checkbox', 'radio', 'file', 'date', 'url', 'phone', 'rich-text'] }),
    __metadata("design:type", String)
], FormField.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], FormField.prototype, "required", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormField.prototype, "placeholder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], FormField.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormField.prototype, "helpText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], FormField.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FormField.prototype, "maxLength", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormField.prototype, "accept", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FormField.prototype, "maxFileSize", void 0);
exports.FormField = FormField = __decorate([
    (0, mongoose_1.Schema)()
], FormField);
exports.FormFieldSchema = mongoose_1.SchemaFactory.createForClass(FormField);
let Form = class Form {
    title;
    description;
    type;
    fields;
    linkedEvent;
    linkedProgramme;
    status;
    deadline;
    coverImage;
    allowMultipleSubmissions;
    successMessage;
    maxSubmissions;
};
exports.Form = Form;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Form.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Form.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['registration', 'call-for-papers', 'article-submission', 'comic-strip-contest', 'abstract-submission', 'survey', 'feedback', 'custom'] }),
    __metadata("design:type", String)
], Form.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FormFieldSchema], default: [] }),
    __metadata("design:type", Array)
], Form.prototype, "fields", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Event' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Form.prototype, "linkedEvent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Programme' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Form.prototype, "linkedProgramme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft', enum: ['active', 'closed', 'draft'] }),
    __metadata("design:type", String)
], Form.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Form.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Form.prototype, "coverImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Form.prototype, "allowMultipleSubmissions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Form.prototype, "successMessage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Form.prototype, "maxSubmissions", void 0);
exports.Form = Form = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Form);
exports.FormSchema = mongoose_1.SchemaFactory.createForClass(Form);
let FormSubmission = class FormSubmission {
    formId;
    data;
    submitterEmail;
    submitterName;
    status;
    reviewNotes;
};
exports.FormSubmission = FormSubmission;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Form', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FormSubmission.prototype, "formId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], FormSubmission.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormSubmission.prototype, "submitterEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormSubmission.prototype, "submitterName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'submitted', enum: ['submitted', 'under-review', 'accepted', 'rejected'] }),
    __metadata("design:type", String)
], FormSubmission.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FormSubmission.prototype, "reviewNotes", void 0);
exports.FormSubmission = FormSubmission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FormSubmission);
exports.FormSubmissionSchema = mongoose_1.SchemaFactory.createForClass(FormSubmission);
//# sourceMappingURL=forms.schema.js.map