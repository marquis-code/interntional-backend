import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MentorshipService } from './mentorship.service';
import { CreateMentorshipDto, UpdateMentorshipStatusDto } from './dto/create-mentorship.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { UserRole } from '../users/schemas/user.schema';

@Controller('mentorship')
export class MentorshipController {
  constructor(private readonly mentorshipService: MentorshipService) {}

  @Post('request')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMentorshipDto: CreateMentorshipDto, @Request() req) {
    return this.mentorshipService.create(createMentorshipDto, req.user.userId);
  }

  @Get('my-status')
  @UseGuards(AuthGuard('jwt'))
  findMyStatus(@Request() req, @Query('application') application?: string) {
    return this.mentorshipService.findMyStatus(req.user.userId, application);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('application') application?: string) {
    return this.mentorshipService.findAll({ page: Number(page) || 1, limit: Number(limit) || 10 }, application);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.mentorshipService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateMentorshipStatusDto) {
    return this.mentorshipService.updateStatus(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.mentorshipService.remove(id);
  }

  // Mentor endpoints
  @Post('mentors')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  createMentor(@Body() body: any) {
    return this.mentorshipService.createMentor(body);
  }

  @Get('mentors/all')
  findAllMentors() {
    return this.mentorshipService.findAllMentors();
  }

  @Patch('mentors/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  updateMentor(@Param('id') id: string, @Body() body: any) {
    return this.mentorshipService.updateMentor(id, body);
  }

  @Delete('mentors/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  removeMentor(@Param('id') id: string) {
    return this.mentorshipService.removeMentor(id);
  }

  // Category endpoints
  @Post('categories')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  createCategory(@Body() body: any) {
    return this.mentorshipService.createCategory(body);
  }

  @Get('categories/all')
  findAllCategories() {
    return this.mentorshipService.findAllCategories();
  }

  @Delete('categories/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  removeCategory(@Param('id') id: string) {
    return this.mentorshipService.removeCategory(id);
  }
}
