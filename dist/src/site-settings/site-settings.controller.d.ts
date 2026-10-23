import { SiteSettingsService } from './site-settings.service';
export declare class SiteSettingsController {
    private readonly siteSettingsService;
    constructor(siteSettingsService: SiteSettingsService);
    getSettings(platform: string): Promise<any>;
    updateSettings(platform: string, data: any): Promise<any>;
    saveSettings(platform: string, data: any): Promise<any>;
}
