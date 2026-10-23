import { Model } from 'mongoose';
import { SiteSettings, SiteSettingsDocument } from './site-settings.schema';
export declare class SiteSettingsService {
    private siteSettingsModel;
    private readonly logger;
    constructor(siteSettingsModel: Model<SiteSettingsDocument>);
    getDefaultSettings(platform: string): {
        platform: string;
        stats: {
            enabled: boolean;
            title: string;
            metrics: {
                value: string;
                label: string;
            }[];
        };
        sections: {
            stats: boolean;
            articles: boolean;
            testimonials: boolean;
            mentorship: boolean;
            career: boolean;
            events: boolean;
            pricing: boolean;
            cvUploadMandatory: boolean;
        };
        customConfig: {};
    };
    getSettings(platform: string): Promise<any>;
    updateSettings(platform: string, data: Partial<SiteSettings>): Promise<any>;
}
