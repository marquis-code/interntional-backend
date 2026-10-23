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
var SiteSettingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const site_settings_schema_1 = require("./site-settings.schema");
let SiteSettingsService = SiteSettingsService_1 = class SiteSettingsService {
    siteSettingsModel;
    logger = new common_1.Logger(SiteSettingsService_1.name);
    constructor(siteSettingsModel) {
        this.siteSettingsModel = siteSettingsModel;
    }
    getDefaultSettings(platform) {
        const isUniverse = platform.toLowerCase() === 'universe';
        return {
            platform: isUniverse ? 'universe' : 'interntional',
            stats: {
                enabled: false,
                title: isUniverse
                    ? 'Platform Impact & Student Community'
                    : 'Platform Impact & Professional Reach',
                metrics: isUniverse
                    ? [
                        { value: '5k+', label: 'Verified Students' },
                        { value: '10k+', label: 'Study Resources' },
                        { value: '150+', label: 'Senior Mentors' },
                        { value: '50+', label: 'Partner Labs' },
                    ]
                    : [
                        { value: '5k+', label: 'Verified Interns' },
                        { value: '10k+', label: 'Study Resources' },
                        { value: '150+', label: 'Senior Mentors' },
                        { value: '50+', label: 'Partner Labs' },
                    ],
            },
            sections: {
                stats: false,
                articles: true,
                testimonials: true,
                mentorship: true,
                career: true,
                events: true,
                pricing: true,
                cvUploadMandatory: false,
            },
            customConfig: {},
        };
    }
    async getSettings(platform) {
        const normPlatform = platform.toLowerCase();
        const existing = await this.siteSettingsModel.findOne({ platform: normPlatform }).lean();
        if (existing) {
            const defaults = this.getDefaultSettings(normPlatform);
            return {
                ...defaults,
                ...existing,
                stats: {
                    ...defaults.stats,
                    ...(existing.stats || {}),
                    metrics: existing.stats?.metrics && existing.stats.metrics.length > 0
                        ? existing.stats.metrics
                        : defaults.stats.metrics,
                },
                sections: {
                    ...defaults.sections,
                    ...(existing.sections || {}),
                },
            };
        }
        return this.getDefaultSettings(normPlatform);
    }
    async updateSettings(platform, data) {
        const normPlatform = platform.toLowerCase();
        this.logger.log(`Updating site settings for platform: ${normPlatform}`);
        if (data.stats && typeof data.stats.enabled === 'boolean') {
            const sections = data.sections || {};
            sections.stats = data.stats.enabled;
            data.sections = sections;
        }
        const updated = await this.siteSettingsModel.findOneAndUpdate({ platform: normPlatform }, { $set: { ...data, platform: normPlatform } }, { new: true, upsert: true, setDefaultsOnInsert: true }).lean();
        return updated;
    }
};
exports.SiteSettingsService = SiteSettingsService;
exports.SiteSettingsService = SiteSettingsService = SiteSettingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(site_settings_schema_1.SiteSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SiteSettingsService);
//# sourceMappingURL=site-settings.service.js.map