import { Controller, Get, Post, Delete, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'))
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll() {
    return this.jobsService.findAll();
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
