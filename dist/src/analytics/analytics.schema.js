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
exports.AnalyticsEventSchema = exports.AnalyticsEvent = exports.EventType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var EventType;
(function (EventType) {
    EventType["PAGE_VIEW"] = "page_view";
    EventType["LOGIN"] = "login";
    EventType["DOWNLOAD"] = "download";
    EventType["JOB_CLICK"] = "job_click";
    EventType["ENQUIRY_SUBMIT"] = "enquiry_submit";
    EventType["SIGNUP"] = "signup";
    EventType["PAYMENT_INIT"] = "payment_init";
    EventType["PAYMENT_SUCCESS"] = "payment_success";
    EventType["DOCUMENT_UPLOAD"] = "document_upload";
    EventType["VAULT_ACCESS"] = "vault_access";
    EventType["MENTOR_CONNECT"] = "mentor_connect";
})(EventType || (exports.EventType = EventType = {}));
let AnalyticsEvent = class AnalyticsEvent {
    event;
    userId;
    page;
    metadata;
    ipAddress;
    userAgent;
    department;
};
exports.AnalyticsEvent = AnalyticsEvent;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: EventType }),
    __metadata("design:type", String)
], AnalyticsEvent.prototype, "event", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AnalyticsEvent.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AnalyticsEvent.prototype, "page", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], AnalyticsEvent.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AnalyticsEvent.prototype, "ipAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AnalyticsEvent.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AnalyticsEvent.prototype, "department", void 0);
exports.AnalyticsEvent = AnalyticsEvent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AnalyticsEvent);
exports.AnalyticsEventSchema = mongoose_1.SchemaFactory.createForClass(AnalyticsEvent);
exports.AnalyticsEventSchema.index({ event: 1, createdAt: -1 });
exports.AnalyticsEventSchema.index({ userId: 1 });
exports.AnalyticsEventSchema.index({ department: 1 });
//# sourceMappingURL=analytics.schema.js.map