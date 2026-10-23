import { Controller, Get, Patch, Post, Param, Body } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';

@Controller('site-settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get(':platform')
  async getSettings(@Param('platform') platform: string) {
    return this.siteSettingsService.getSettings(platform);
  }

  @Patch(':platform')
  async updateSettings(@Param('platform') platform: string, @Body() data: any) {
    return this.siteSettingsService.updateSettings(platform, data);
  }

  @Post(':platform')
  async saveSettings(@Param('platform') platform: string, @Body() data: any) {
    return this.siteSettingsService.updateSettings(platform, data);
  }
}
