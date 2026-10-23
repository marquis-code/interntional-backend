import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSettings, SiteSettingsDocument } from './site-settings.schema';

@Injectable()
export class SiteSettingsService {
  private readonly logger = new Logger(SiteSettingsService.name);

  constructor(
    @InjectModel(SiteSettings.name)
    private siteSettingsModel: Model<SiteSettingsDocument>,
  ) {}

  getDefaultSettings(platform: string) {
    const isUniverse = platform.toLowerCase() === 'universe';
    return {
      platform: isUniverse ? 'universe' : 'interntional',
      stats: {
        enabled: false, // Default false until admin toggles it ON
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

  async getSettings(platform: string): Promise<any> {
    const normPlatform = platform.toLowerCase();
    const existing = await this.siteSettingsModel.findOne({ platform: normPlatform }).lean();
    if (existing) {
      // Merge with defaults to ensure all keys exist
      const defaults = this.getDefaultSettings(normPlatform);
      return {
        ...defaults,
        ...existing,
        stats: {
          ...defaults.stats,
          ...(existing.stats || {}),
          metrics:
            existing.stats?.metrics && existing.stats.metrics.length > 0
              ? existing.stats.metrics
              : defaults.stats.metrics,
        },
        sections: {
          ...defaults.sections,
          ...(existing.sections || {}),
        },
      };
    }

    // Return defaults if not initialized in database
    return this.getDefaultSettings(normPlatform);
  }

  async updateSettings(platform: string, data: Partial<SiteSettings>): Promise<any> {
    const normPlatform = platform.toLowerCase();
    this.logger.log(`Updating site settings for platform: ${normPlatform}`);

    // If stats.enabled changed, keep sections.stats synced
    if (data.stats && typeof data.stats.enabled === 'boolean') {
      const sections = data.sections || ({} as any);
      sections.stats = data.stats.enabled;
      data.sections = sections;
    }

    const updated = await this.siteSettingsModel.findOneAndUpdate(
      { platform: normPlatform },
      { $set: { ...data, platform: normPlatform } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return updated;
  }
}
