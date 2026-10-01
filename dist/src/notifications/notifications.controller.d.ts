import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any, page?: number, limit?: number, unreadOnly?: string, type?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./notification.schema").NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    getUnreadCount(req: any): Promise<{
        unreadCount: number;
    }>;
    markAsRead(req: any, id: string): Promise<{
        success: boolean;
        notification: import("mongoose").Document<unknown, {}, import("./notification.schema").NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        unreadCount: number;
    }>;
    markAllAsRead(req: any): Promise<{
        success: boolean;
        message: string;
        unreadCount: number;
    }>;
    deleteNotification(req: any, id: string): Promise<{
        success: boolean;
        message: string;
        unreadCount: number;
    }>;
    getAllAdminNotifications(page?: number, limit?: number, userId?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./notification.schema").NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    broadcastNotification(body: {
        title: string;
        message: string;
        type: string;
        userId?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
