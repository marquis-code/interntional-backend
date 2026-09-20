import { AnalyticsService } from './analytics.service';
import { EventType } from './analytics.schema';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    trackEvent(body: {
        event: EventType;
        userId?: string;
        page?: string;
        metadata?: Record<string, any>;
        department?: string;
    }, req: any): Promise<import("./analytics.schema").AnalyticsEventDocument>;
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
    getRecentActivity(): Promise<import("./analytics.schema").AnalyticsEventDocument[]>;
    getEngagementByDepartment(): Promise<any[]>;
}
