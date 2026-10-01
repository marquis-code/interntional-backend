import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from auth object, query param, or authorization header
      const token =
        client.handshake.auth?.token ||
        client.handshake.query?.token ||
        (client.handshake.headers.authorization
          ? client.handshake.headers.authorization.replace('Bearer ', '')
          : null);

      if (!token) {
        this.logger.warn(`Client connected without token: ${client.id}`);
        return;
      }

      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub || decoded.id || decoded.userId;

      if (!userId) {
        this.logger.warn(`Token missing user id: ${client.id}`);
        return;
      }

      // Store userId in client socket data
      client.data.userId = userId.toString();

      // Join the personal room for this user
      const room = `user_${userId}`;
      await client.join(room);
      this.logger.log(`Client ${client.id} joined room: ${room}`);

      // Send connection acknowledgement
      client.emit('connected', {
        status: 'ok',
        userId: client.data.userId,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      this.logger.error(`WebSocket authentication error: ${err.message}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id} (User: ${client.data?.userId || 'unknown'})`);
  }

  /**
   * Emit a real-time notification to a specific user
   */
  sendToUser(userId: string, notification: any) {
    const room = `user_${userId}`;
    this.server.to(room).emit('new_notification', notification);
    this.logger.log(`Dispatched real-time notification to ${room}: "${notification.title}"`);
  }

  /**
   * Emit an unread count update to a specific user
   */
  sendUnreadCount(userId: string, unreadCount: number) {
    const room = `user_${userId}`;
    this.server.to(room).emit('unread_count_update', { unreadCount });
  }

  /**
   * Broadcast a notification to all connected clients
   */
  sendToAll(notification: any) {
    this.server.emit('broadcast_notification', notification);
    this.logger.log(`Broadcast notification sent to all: "${notification.title}"`);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket): string {
    return 'pong';
  }
}
