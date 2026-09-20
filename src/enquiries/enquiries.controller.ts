import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  async create(@Body() createDto: { name: string; email: string; message: string }) {
    return this.enquiriesService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.enquiriesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.enquiriesService.markAsRead(id);
  }
}
