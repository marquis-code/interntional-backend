import { Model } from 'mongoose';
import { AnalyticsEventDocument, EventType } from './analytics.schema';
export declare class AnalyticsService {
    private analyticsModel;
    constructor(analyticsModel: Model<AnalyticsEventDocument>);
    trackEvent(data: {
        event: EventType;
        userId?: string;
        page?: string;
        metadata?: Record<string, any>;
        ipAddress?: string;
        userAgent?: string;
        department?: string;
    }): Promise<AnalyticsEventDocument>;
    getDashboardStats(): Promise<{
        totalEvents: number;
        todayPageViews: number;
        todayLogins: number;
        weeklyDownloads: number;
        weeklyJobClicks: number;
        monthlySignups: number;
        monthlyPayments: number;
        eventBreakdown: any;
        dailyPageViews: {
            date: any;
            views: any;
        }[];
        departmentEngagement: any;
    }>;
    getRecentActivity(limit?: number): Promise<AnalyticsEventDocument[]>;
    getEngagementByDepartment(): Promise<any[]>;
}
