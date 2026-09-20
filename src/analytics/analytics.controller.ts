import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { EventType } from './analytics.schema';
import { UserRole } from '../users/schemas/user.schema';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * POST /analytics/track — public endpoint for frontend to send events
   * No auth required so we can track anonymous page views too
   */
  @Post('track')
  async trackEvent(@Body() body: {
    event: EventType;
    userId?: string;
    page?: string;
    metadata?: Record<string, any>;
    department?: string;
  }, @Req() req: any) {
    return this.analyticsService.trackEvent({
      ...body,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || '',
    });
  }

  /**
   * GET /analytics/dashboard — admin-only aggregated stats
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('dashboard')
  async getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  /**
   * GET /analytics/activity — admin-only recent activity feed
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Get('activity')
  async getRecentActivity() {
    return this.analyticsService.getRecentActivity();
  }

  /**
   * GET /analytics/departments — department engagement breakdown
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DEPARTMENT_HEAD)
  @Get('departments')
  async getEngagementByDepartment() {
    return this.analyticsService.getEngagementByDepartment();
  }
}
