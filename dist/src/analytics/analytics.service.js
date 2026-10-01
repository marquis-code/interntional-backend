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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const analytics_schema_1 = require("./analytics.schema");
const payment_schema_1 = require("../payments/payment.schema");
let AnalyticsService = class AnalyticsService {
    analyticsModel;
    paymentModel;
    constructor(analyticsModel, paymentModel) {
        this.analyticsModel = analyticsModel;
        this.paymentModel = paymentModel;
    }
    async trackEvent(data) {
        const eventDoc = new this.analyticsModel({
            event: data.event,
            userId: data.userId ? new mongoose_2.Types.ObjectId(data.userId) : null,
            page: data.page || '',
            metadata: data.metadata || {},
            ipAddress: data.ipAddress || '',
            userAgent: data.userAgent || '',
            department: data.department || '',
        });
        return eventDoc.save();
    }
    async getDashboardStats(startDateStr, endDateStr) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        let isCustom = false;
        let customStart = thirtyDaysAgo;
        let customEnd = now;
        if (startDateStr && endDateStr) {
            const s = new Date(startDateStr);
            const e = new Date(endDateStr);
            if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
                isCustom = true;
                customStart = s;
                customEnd = e;
            }
        }
        const getMatch = (defaultDate, extra = {}) => {
            if (isCustom) {
                return { createdAt: { $gte: customStart, $lte: customEnd }, ...extra };
            }
            return { createdAt: { $gte: defaultDate }, ...extra };
        };
        const [totalEvents, todayPageViews, todayLogins, weeklyDownloads, weeklyJobClicks, monthlySignups, monthlyPayments, eventBreakdown, dailyPageViews, departmentEngagement, totalRevenueData, monthlyRevenueData, dailyRevenueData,] = await Promise.all([
            this.analyticsModel.countDocuments(isCustom ? { createdAt: { $gte: customStart, $lte: customEnd } } : {}).exec(),
            this.analyticsModel.countDocuments(getMatch(today, { event: analytics_schema_1.EventType.PAGE_VIEW })).exec(),
            this.analyticsModel.countDocuments(getMatch(today, { event: analytics_schema_1.EventType.LOGIN })).exec(),
            this.analyticsModel.countDocuments(getMatch(sevenDaysAgo, { event: analytics_schema_1.EventType.DOWNLOAD })).exec(),
            this.analyticsModel.countDocuments(getMatch(sevenDaysAgo, { event: analytics_schema_1.EventType.JOB_CLICK })).exec(),
            this.analyticsModel.countDocuments(getMatch(thirtyDaysAgo, { event: analytics_schema_1.EventType.SIGNUP })).exec(),
            this.analyticsModel.countDocuments(getMatch(thirtyDaysAgo, { event: analytics_schema_1.EventType.PAYMENT_SUCCESS })).exec(),
            this.analyticsModel.aggregate([
                { $match: getMatch(thirtyDaysAgo) },
                { $group: { _id: '$event', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]).exec(),
            this.analyticsModel.aggregate([
                { $match: getMatch(fourteenDaysAgo, { event: analytics_schema_1.EventType.PAGE_VIEW }) },
                { $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 },
                    } },
                { $sort: { _id: 1 } },
            ]).exec(),
            this.analyticsModel.aggregate([
                { $match: getMatch(thirtyDaysAgo, { department: { $ne: '' } }) },
                { $group: { _id: '$department', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]).exec(),
            this.paymentModel.aggregate([
                { $match: isCustom ? { status: payment_schema_1.PaymentStatus.SUCCESS, createdAt: { $gte: customStart, $lte: customEnd } } : { status: payment_schema_1.PaymentStatus.SUCCESS } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]).exec(),
            this.paymentModel.aggregate([
                { $match: getMatch(thirtyDaysAgo, { status: payment_schema_1.PaymentStatus.SUCCESS }) },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]).exec(),
            this.paymentModel.aggregate([
                { $match: getMatch(fourteenDaysAgo, { status: payment_schema_1.PaymentStatus.SUCCESS }) },
                { $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        total: { $sum: '$amount' },
                    } },
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
    async getRecentActivity(limit = 50) {
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
                } },
            { $group: {
                    _id: '$_id.department',
                    events: { $push: { event: '$_id.event', count: '$count' } },
                    total: { $sum: '$count' },
                } },
            { $sort: { total: -1 } },
        ]).exec();
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(analytics_schema_1.AnalyticsEvent.name)),
    __param(1, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map