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
exports.SiteSettingsSchema = exports.SiteSettings = exports.SectionsConfigSchema = exports.SectionsConfig = exports.StatsConfigSchema = exports.StatsConfig = exports.MetricItemSchema = exports.MetricItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let MetricItem = class MetricItem {
    value;
    label;
};
exports.MetricItem = MetricItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetricItem.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MetricItem.prototype, "label", void 0);
exports.MetricItem = MetricItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MetricItem);
exports.MetricItemSchema = mongoose_1.SchemaFactory.createForClass(MetricItem);
let StatsConfig = class StatsConfig {
    enabled;
    title;
    metrics;
};
exports.StatsConfig = StatsConfig;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StatsConfig.prototype, "enabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Platform Impact & Milestones' }),
    __metadata("design:type", String)
], StatsConfig.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MetricItemSchema], default: [] }),
    __metadata("design:type", Array)
], StatsConfig.prototype, "metrics", void 0);
exports.StatsConfig = StatsConfig = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], StatsConfig);
exports.StatsConfigSchema = mongoose_1.SchemaFactory.createForClass(StatsConfig);
let SectionsConfig = class SectionsConfig {
    stats;
    articles;
    testimonials;
    mentorship;
    career;
    events;
    pricing;
    cvUploadMandatory;
};
exports.SectionsConfig = SectionsConfig;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "stats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "articles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "testimonials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "mentorship", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "career", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "events", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "pricing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], SectionsConfig.prototype, "cvUploadMandatory", void 0);
exports.SectionsConfig = SectionsConfig = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SectionsConfig);
exports.SectionsConfigSchema = mongoose_1.SchemaFactory.createForClass(SectionsConfig);
let SiteSettings = class SiteSettings {
    platform;
    stats;
    sections;
    customConfig;
};
exports.SiteSettings = SiteSettings;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], SiteSettings.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.StatsConfigSchema, default: () => ({}) }),
    __metadata("design:type", StatsConfig)
], SiteSettings.prototype, "stats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.SectionsConfigSchema, default: () => ({}) }),
    __metadata("design:type", SectionsConfig)
], SiteSettings.prototype, "sections", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SiteSettings.prototype, "customConfig", void 0);
exports.SiteSettings = SiteSettings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strict: false })
], SiteSettings);
exports.SiteSettingsSchema = mongoose_1.SchemaFactory.createForClass(SiteSettings);
//# sourceMappingURL=site-settings.schema.js.map