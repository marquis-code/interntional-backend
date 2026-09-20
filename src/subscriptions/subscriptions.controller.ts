import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // Public: get active plans
  @Get()
  async findActive() {
    return this.subscriptionsService.findActive();
  }

  // Admin: get all plans including inactive
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async findAll() {
    return this.subscriptionsService.findAll();
  }

  // Admin: create plan
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: { name: string; description: string; price: number; durationMonths: number; features: string[] }) {
    return this.subscriptionsService.create(body);
  }

  // Admin: update plan
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<{ name: string; description: string; price: number; durationMonths: number; features: string[]; isActive: boolean }>) {
    return this.subscriptionsService.update(id, body);
  }

  // Admin: soft-delete plan
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subscriptionsService.delete(id);
  }
}
