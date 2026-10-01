import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
import { Application } from './schemas/application.schema';
import type { PaginationParams } from '../utils/pagination.util';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'))
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(@Query() query: PaginationParams & { status?: string }) {
    return this.jobsService.findAll(query);
  }

  @Post()
  async create(@Body() body: Partial<Job>) {
    return this.jobsService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Job>) {
    return this.jobsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return { message: 'Job deleted successfully' };
  }

  @Post('apply')
  async apply(@Body() body: Partial<Application>) {
    return this.jobsService.createApplication(body);
  }

  @Get('applications')
  async getApplications(@Query() query: PaginationParams) {
    return this.jobsService.getApplications(query);
  }
}
