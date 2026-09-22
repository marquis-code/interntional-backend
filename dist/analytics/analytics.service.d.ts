import { Model } from 'mongoose';
import { AnalyticsEventDocument, EventType } from './analytics.schema';
import { PaymentDocument } from '../payments/payment.schema';
export declare class AnalyticsService {
    private analyticsModel;
    private paymentModel;
    constructor(analyticsModel: Model<AnalyticsEventDocument>, paymentModel: Model<PaymentDocument>);
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
        totalRevenue: any;
        monthlyRevenue: any;
        dailyRevenue: {
            date: any;
            amount: any;
        }[];
    }>;
    getRecentActivity(limit?: number): Promise<AnalyticsEventDocument[]>;
    getEngagementByDepartment(): Promise<any[]>;
}
