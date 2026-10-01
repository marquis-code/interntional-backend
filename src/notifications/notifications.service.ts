import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
  NotificationType,
} from './notification.schema';
import { NotificationsGateway } from './notifications.gateway';

export interface CreateNotificationDto {
  userId: string | Types.ObjectId;
  title: string;
  message: string;
  type?: NotificationType | string;
  link?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly gateway: NotificationsGateway,
  ) {}

  /**
   * Create and immediately broadcast a push notification to the user
   */
  async create(dto: CreateNotificationDto): Promise<NotificationDocument> {
    const notification = new this.notificationModel({
      userId: new Types.ObjectId(dto.userId.toString()),
      title: dto.title,
      message: dto.message,
      type: (dto.type as NotificationType) || NotificationType.SYSTEM,
      link: dto.link || '',
      metadata: dto.metadata || {},
      isRead: false,
    });
    await notification.save();

    const populated = await notification.populate('userId', 'firstName lastName email');

    // Real-time dispatch via WebSocket
    try {
      this.gateway.sendToUser(dto.userId.toString(), populated);
      const unreadCount = await this.getUnreadCount(dto.userId.toString());
      this.gateway.sendUnreadCount(dto.userId.toString(), unreadCount);
    } catch (err: any) {
      this.logger.error(`Failed to push notification via WebSocket: ${err.message}`);
    }

    return populated;
  }

  /**
   * Get paginated notifications for a specific user
   */
  async getUserNotifications(
    userId: string,
    query: { page?: number; limit?: number; unreadOnly?: boolean; type?: string } = {},
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const filter: any = { userId: new Types.ObjectId(userId) };

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
        userId: new Types.ObjectId(userId),
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

  /**
   * Get total count of unread notifications
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel
      .countDocuments({
        userId: new Types.ObjectId(userId),
        isRead: false,
      })
      .exec();
  }

  /**
   * Mark a single notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.notificationModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(notificationId),
        userId: new Types.ObjectId(userId),
      },
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    const unreadCount = await this.getUnreadCount(userId);
    this.gateway.sendUnreadCount(userId, unreadCount);

    return { success: true, notification, unreadCount };
  }

  /**
   * Mark all notifications for a user as read
   */
  async markAllAsRead(userId: string) {
    await this.notificationModel.updateMany(
      {
        userId: new Types.ObjectId(userId),
        isRead: false,
      },
      { isRead: true },
    );

    this.gateway.sendUnreadCount(userId, 0);

    return { success: true, message: 'All notifications marked as read.', unreadCount: 0 };
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string, userId: string) {
    const res = await this.notificationModel.findOneAndDelete({
      _id: new Types.ObjectId(notificationId),
      userId: new Types.ObjectId(userId),
    });

    if (!res) {
      throw new NotFoundException('Notification not found.');
    }

    const unreadCount = await this.getUnreadCount(userId);
    this.gateway.sendUnreadCount(userId, unreadCount);

    return { success: true, message: 'Notification deleted.', unreadCount };
  }

  /**
   * ADMIN: Get all notifications system-wide
   */
  async getAllAdminNotifications(query: { page: number; limit: number; userId?: string }) {
    const skip = (query.page - 1) * query.limit;
    const filter: any = {};
    if (query.userId) {
      filter.userId = new Types.ObjectId(query.userId);
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
}
