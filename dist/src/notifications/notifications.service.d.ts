import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './notification.schema';
import { NotificationsGateway } from './notifications.gateway';
export interface CreateNotificationDto {
    userId: string | Types.ObjectId;
    title: string;
    message: string;
    type?: NotificationType | string;
    link?: string;
    metadata?: Record<string, any>;
}
export declare class NotificationsService {
    private readonly notificationModel;
    private readonly gateway;
    private readonly logger;
    constructor(notificationModel: Model<NotificationDocument>, gateway: NotificationsGateway);
    create(dto: CreateNotificationDto): Promise<NotificationDocument>;
    getUserNotifications(userId: string, query?: {
        page?: number;
        limit?: number;
        unreadOnly?: boolean;
        type?: string;
    }): Promise<{
        items: (import("mongoose").Document<unknown, {}, NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & Notification & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        pages: number;
        unreadCount: number;
    }>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(notificationId: string, userId: string): Promise<{
        success: boolean;
        notification: import("mongoose").Document<unknown, {}, NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & Notification & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        unreadCount: number;
    }>;
    markAllAsRead(userId: string): Promise<{
        success: boolean;
        message: string;
        unreadCount: number;
    }>;
    deleteNotification(notificationId: string, userId: string): Promise<{
        success: boolean;
        message: string;
        unreadCount: number;
    }>;
    getAllAdminNotifications(query: {
        page: number;
        limit: number;
        userId?: string;
    }): Promise<{
        items: (import("mongoose").Document<unknown, {}, NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & Notification & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
}
