import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('unreadOnly') unreadOnly?: string,
    @Query('type') type?: string,
  ) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.notificationsService.getUserNotifications(userId.toString(), {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      unreadOnly: unreadOnly === 'true',
      type,
    });
  }

  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    const count = await this.notificationsService.getUnreadCount(userId.toString());
    return { unreadCount: count };
  }

  @Patch(':id/read')
  async markAsRead(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.notificationsService.markAsRead(id, userId.toString());
  }

  @Patch('read-all')
  async markAllAsRead(@Req() req: any) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.notificationsService.markAllAsRead(userId.toString());
  }

  @Delete(':id')
  async deleteNotification(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.notificationsService.deleteNotification(id, userId.toString());
  }

  // --- Admin Endpoints ---

  @Get('admin/all')
  async getAllAdminNotifications(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
  ) {
    return this.notificationsService.getAllAdminNotifications({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 50,
      userId,
    });
  }

  @Post('admin/broadcast')
  async broadcastNotification(@Body() body: { title: string; message: string; type: string; userId?: string }) {
    if (body.userId) {
      await this.notificationsService.create({
        userId: body.userId,
        title: body.title,
        message: body.message,
        type: body.type,
      });
      return { success: true, message: 'Notification sent to user.' };
    } else {
      // Very naive broadcast: creating one notification per user. This could be slow in large scale,
      // but for now it satisfies the requirement. Ideally, we would have a 'broadcast' flag or batch insert.
      return { success: false, message: 'Broadcast to all users is not yet implemented.' };
    }
  }
}
