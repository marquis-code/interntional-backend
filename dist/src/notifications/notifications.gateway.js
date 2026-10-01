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
var NotificationsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let NotificationsGateway = NotificationsGateway_1 = class NotificationsGateway {
    jwtService;
    server;
    logger = new common_1.Logger(NotificationsGateway_1.name);
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ||
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
            client.data.userId = userId.toString();
            const room = `user_${userId}`;
            await client.join(room);
            this.logger.log(`Client ${client.id} joined room: ${room}`);
            client.emit('connected', {
                status: 'ok',
                userId: client.data.userId,
                timestamp: new Date().toISOString(),
            });
        }
        catch (err) {
            this.logger.error(`WebSocket authentication error: ${err.message}`);
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id} (User: ${client.data?.userId || 'unknown'})`);
    }
    sendToUser(userId, notification) {
        const room = `user_${userId}`;
        this.server.to(room).emit('new_notification', notification);
        this.logger.log(`Dispatched real-time notification to ${room}: "${notification.title}"`);
    }
    sendUnreadCount(userId, unreadCount) {
        const room = `user_${userId}`;
        this.server.to(room).emit('unread_count_update', { unreadCount });
    }
    sendToAll(notification) {
        this.server.emit('broadcast_notification', notification);
        this.logger.log(`Broadcast notification sent to all: "${notification.title}"`);
    }
    handlePing(client) {
        return 'pong';
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", String)
], NotificationsGateway.prototype, "handlePing", null);
exports.NotificationsGateway = NotificationsGateway = NotificationsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/notifications',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], NotificationsGateway);
//# sourceMappingURL=notifications.gateway.js.map