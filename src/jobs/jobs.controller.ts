import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
import type { PaginationParams } from '../utils/pagination.util';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'))
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(@Query() query: PaginationParams) {
    return this.jobsService.findAll(query);
  }

  @Post()
  async create(@Body() body: Partial<Job>) {
    return this.jobsService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return { message: 'Job deleted successfully' };
  }
}
