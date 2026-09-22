import { Controller, Get, Post, Body, Param, UseGuards, Req, Headers, RawBodyRequest, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { UserRole } from '../users/schemas/user.schema';
import type { PaginationParams } from '../utils/pagination.util';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Initialize a payment (authenticated user)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('initialize')
  async initialize(
    @Req() req: any,
    @Body() body: { subscriptionId: string; callbackUrl: string },
  ) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    const email = req.user.email;
    return this.paymentsService.initializePayment(
      userId,
      body.subscriptionId,
      email,
      body.callbackUrl,
    );
  }

  /**
   * Verify a payment by reference
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('verify/:reference')
  async verify(@Param('reference') reference: string) {
    return this.paymentsService.verifyPayment(reference);
  }

  /**
   * Paystack webhook endpoint
   * Validates signature, processes charge.success events
   */
  @Post('webhook')
  async webhook(@Body() body: any, @Headers('x-paystack-signature') signature: string) {
    // Validate Paystack signature
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
    if (secretKey && signature) {
      const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(body)).digest('hex');
      if (hash !== signature) {
        return { message: 'Invalid signature' };
      }
    }

    return this.paymentsService.handleWebhook(body);
  }

  /**
   * Get all payments (admin)
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get()
  async findAll(@Query() query: PaginationParams) {
    return this.paymentsService.findAll(query);
  }

  /**
   * Get payment statistics (admin)
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('stats')
  async getStats() {
    return this.paymentsService.getPaymentStats();
  }

  /**
   * Get current user's payments
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async findMine(@Req() req: any) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.paymentsService.findByUser(userId);
  }
}
