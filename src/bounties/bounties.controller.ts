import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { BountiesService } from './bounties.service';
import { CreateBountyDto, BookBountyDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('bounties')
export class BountiesController {
  constructor(private readonly bountiesService: BountiesService) {}

  @Get()
  async getBounties(
    @Query('environment') environment?: string,
    @Query('category') category?: string
  ) {
    return await this.bountiesService.getBounties(environment, category);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create')
  async createBounty(@Req() req, @Body() dto: CreateBountyDto) {
    return await this.bountiesService.createBounty(req.user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('book')
  async bookBounty(@Req() req, @Body() dto: BookBountyDto) {
    return await this.bountiesService.bookBounty(req.user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('my-bookings')
  async getMyBookings(@Req() req) {
    return await this.bountiesService.getMyBookings(req.user._id);
  }
}
