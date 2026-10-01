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
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./notification.schema");
const notifications_gateway_1 = require("./notifications.gateway");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    notificationModel;
    gateway;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(notificationModel, gateway) {
        this.notificationModel = notificationModel;
        this.gateway = gateway;
    }
    async create(dto) {
        const notification = new this.notificationModel({
            userId: new mongoose_2.Types.ObjectId(dto.userId.toString()),
            title: dto.title,
            message: dto.message,
            type: dto.type || notification_schema_1.NotificationType.SYSTEM,
            link: dto.link || '',
            metadata: dto.metadata || {},
            isRead: false,
        });
        await notification.save();
        const populated = await notification.populate('userId', 'firstName lastName email');
        try {
            this.gateway.sendToUser(dto.userId.toString(), populated);
            const unreadCount = await this.getUnreadCount(dto.userId.toString());
            this.gateway.sendUnreadCount(dto.userId.toString(), unreadCount);
        }
        catch (err) {
            this.logger.error(`Failed to push notification via WebSocket: ${err.message}`);
        }
        return populated;
    }
    async getUserNotifications(userId, query = {}) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
        const skip = (page - 1) * limit;
        const filter = { userId: new mongoose_2.Types.ObjectId(userId) };
        if (query.unreadOnly) {
            filter.isRead = false;
        }
        if (query.type) {
            filter.type = query.type;
        }
        const [items, total, unreadCount] = await Promise.all([
            this.notificationModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.notificationModel.countDocuments(filter).exec(),
            this.notificationModel.countDocuments({
                userId: new mongoose_2.Types.ObjectId(userId),
                isRead: false,
            }).exec(),
        ]);
        return {
            items,
            total,
            page,
            pages: Math.ceil(total / limit) || 1,
            unreadCount,
        };
    }
    async getUnreadCount(userId) {
        return this.notificationModel
            .countDocuments({
            userId: new mongoose_2.Types.ObjectId(userId),
            isRead: false,
        })
            .exec();
    }
    async markAsRead(notificationId, userId) {
        const notification = await this.notificationModel.findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(notificationId),
            userId: new mongoose_2.Types.ObjectId(userId),
        }, { isRead: true }, { new: true });
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found.');
        }
        const unreadCount = await this.getUnreadCount(userId);
        this.gateway.sendUnreadCount(userId, unreadCount);
        return { success: true, notification, unreadCount };
    }
    async markAllAsRead(userId) {
        await this.notificationModel.updateMany({
            userId: new mongoose_2.Types.ObjectId(userId),
            isRead: false,
        }, { isRead: true });
        this.gateway.sendUnreadCount(userId, 0);
        return { success: true, message: 'All notifications marked as read.', unreadCount: 0 };
    }
    async deleteNotification(notificationId, userId) {
        const res = await this.notificationModel.findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(notificationId),
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (!res) {
            throw new common_1.NotFoundException('Notification not found.');
        }
        const unreadCount = await this.getUnreadCount(userId);
        this.gateway.sendUnreadCount(userId, unreadCount);
        return { success: true, message: 'Notification deleted.', unreadCount };
    }
    async getAllAdminNotifications(query) {
        const skip = (query.page - 1) * query.limit;
        const filter = {};
        if (query.userId) {
            filter.userId = new mongoose_2.Types.ObjectId(query.userId);
        }
        const [items, total] = await Promise.all([
            this.notificationModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(query.limit)
                .populate('userId', 'firstName lastName email')
                .exec(),
            this.notificationModel.countDocuments(filter).exec(),
        ]);
        return {
            items,
            total,
            page: query.page,
            pages: Math.ceil(total / query.limit) || 1,
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map