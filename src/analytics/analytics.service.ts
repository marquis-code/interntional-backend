import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AnalyticsEvent, AnalyticsEventDocument, EventType } from './analytics.schema';
import { Payment, PaymentDocument, PaymentStatus } from '../payments/payment.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(AnalyticsEvent.name) private analyticsModel: Model<AnalyticsEventDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async trackEvent(data: {
    event: EventType;
    userId?: string;
    page?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    department?: string;
  }): Promise<AnalyticsEventDocument> {
    const eventDoc = new this.analyticsModel({
      event: data.event,
      userId: data.userId ? new Types.ObjectId(data.userId) : null,
      page: data.page || '',
      metadata: data.metadata || {},
      ipAddress: data.ipAddress || '',
      userAgent: data.userAgent || '',
      department: data.department || '',
    });
    return eventDoc.save();
  }

  async getDashboardStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalEvents,
      todayPageViews,
      todayLogins,
      weeklyDownloads,
      weeklyJobClicks,
      monthlySignups,
      monthlyPayments,
      eventBreakdown,
      dailyPageViews,
      departmentEngagement,
      totalRevenueData,
      monthlyRevenueData,
      dailyRevenueData,
    ] = await Promise.all([
      this.analyticsModel.countDocuments().exec(),
      this.analyticsModel.countDocuments({ event: EventType.PAGE_VIEW, createdAt: { $gte: today } }).exec(),
      this.analyticsModel.countDocuments({ event: EventType.LOGIN, createdAt: { $gte: today } }).exec(),
      this.analyticsModel.countDocuments({ event: EventType.DOWNLOAD, createdAt: { $gte: sevenDaysAgo } }).exec(),
      this.analyticsModel.countDocuments({ event: EventType.JOB_CLICK, createdAt: { $gte: sevenDaysAgo } }).exec(),
      this.analyticsModel.countDocuments({ event: EventType.SIGNUP, createdAt: { $gte: thirtyDaysAgo } }).exec(),
      this.analyticsModel.countDocuments({ event: EventType.PAYMENT_SUCCESS, createdAt: { $gte: thirtyDaysAgo } }).exec(),
      this.analyticsModel.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$event', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).exec(),
      // Daily page views for last 14 days
      this.analyticsModel.aggregate([
        { $match: { event: EventType.PAGE_VIEW, createdAt: { $gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) } } },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        }},
        { $sort: { _id: 1 } },
      ]).exec(),
      this.analyticsModel.aggregate([
        { $match: { department: { $ne: '' }, createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).exec(),
      // Revenue metrics
      this.paymentModel.aggregate([
        { $match: { status: PaymentStatus.SUCCESS } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).exec(),
      this.paymentModel.aggregate([
        { $match: { status: PaymentStatus.SUCCESS, createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).exec(),
      this.paymentModel.aggregate([
        { $match: { status: PaymentStatus.SUCCESS, createdAt: { $gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) } } },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$amount' },
        }},
        { $sort: { _id: 1 } },
      ]).exec(),
    ]);

    return {
      totalEvents,
      todayPageViews,
      todayLogins,
      weeklyDownloads,
      weeklyJobClicks,
      monthlySignups,
      monthlyPayments,
      eventBreakdown: eventBreakdown.reduce((acc, e) => { acc[e._id] = e.count; return acc; }, {}),
      dailyPageViews: dailyPageViews.map(d => ({ date: d._id, views: d.count })),
      departmentEngagement: departmentEngagement.reduce((acc, d) => { acc[d._id] = d.count; return acc; }, {}),
      totalRevenue: totalRevenueData[0]?.total || 0,
      monthlyRevenue: monthlyRevenueData[0]?.total || 0,
      dailyRevenue: dailyRevenueData.map(d => ({ date: d._id, amount: d.total })),
    };
  }

  async getRecentActivity(limit = 50): Promise<AnalyticsEventDocument[]> {
    return this.analyticsModel
      .find()
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getEngagementByDepartment() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return this.analyticsModel.aggregate([
      { $match: { department: { $ne: '' }, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
        _id: { department: '$department', event: '$event' },
        count: { $sum: 1 },
      }},
      { $group: {
        _id: '$_id.department',
        events: { $push: { event: '$_id.event', count: '$count' } },
        total: { $sum: '$count' },
      }},
      { $sort: { total: -1 } },
    ]).exec();
  }
}
