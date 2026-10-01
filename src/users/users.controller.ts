import { Controller, Get, Patch, Param, Body, UseGuards, UseInterceptors, Query, Request, Post, BadRequestException } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles, Permissions } from '../auth/decorators';
import { UserRole, Department } from './schemas/user.schema';
import type { PaginationParams } from '../utils/pagination.util';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Post('invitations')
  async createInvitation(@Body() dto: { email: string, role: string, adminPlatform: string, department?: string, permissions: string[] }) {
    return this.usersService.createAdminInvitation(dto);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('invitations')
  async getInvitations() {
    return this.usersService.getAdminInvitations();
  }

  @Get('me/dashboard-stats')
  async getMyDashboardStats(@Request() req: any) {
    return this.usersService.getUserDashboardStats(req.user.userId);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Post('roles')
  async createCustomRole(@Body() dto: { name: string, permissions: string[] }) {
    if (!dto.name) throw new BadRequestException('Role name is required');
    return this.usersService.createCustomRole(dto.name, dto.permissions || []);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('roles')
  async getCustomRoles() {
    return this.usersService.getCustomRoles();
  }

  // GET /users/pending – list pending users (for admin dashboard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Get('pending')
  async getPending(@Query() query: PaginationParams) {
    return this.usersService.findPendingUsers(query);
  }

  // GET /users/approved – list approved users
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Get('approved')
  async getApproved(@Query() query: PaginationParams) {
    return this.usersService.findApprovedUsers(query);
  }

  // GET /users/all – list all users (for roles management page)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('all')
  async getAll(@Query() query: PaginationParams) {
    return this.usersService.findAllUsers(query);
  }

  // GET /users/stats – aggregate user stats for analytics
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('stats')
  async getStats() {
    return this.usersService.getStats();
  }

  // GET /users/mentors – list active alumni members
  @UseInterceptors(CacheInterceptor)
  @Get('mentors')
  async getMentors() {
    return this.usersService.findMentors();
  }

  // GET /users/department/:department – list by department
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DEPARTMENT_HEAD)
  @Get('department/:department')
  async getByDepartment(@Param('department') department: string) {
    return this.usersService.findByDepartment(department);
  }

  // GET /users/:id – get single user
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.findByIdWithSubscription(id);
  }

  // PATCH /users/:id/approve – approve a user and start their 24-month timer
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    return this.usersService.approveUser(id);
  }

  // PATCH /users/:id/reject – reject a user
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Patch(':id/reject')
  async reject(@Param('id') id: string) {
    return this.usersService.rejectUser(id);
  }

  // PATCH /users/:id/revoke – revoke access
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Patch(':id/revoke')
  async revoke(@Param('id') id: string) {
    return this.usersService.rejectUser(id);
  }

  // PATCH /users/:id/role – change a user's role
  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return this.usersService.updateRole(id, role);
  }

  // PATCH /users/:id/department – assign a department
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Patch(':id/department')
  async updateDepartment(@Param('id') id: string, @Body('department') department: Department) {
    return this.usersService.updateDepartment(id, department);
  }

  // PATCH /users/:id/permissions – update permissions
  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/permissions')
  async updatePermissions(@Param('id') id: string, @Body('permissions') permissions: string[]) {
    return this.usersService.updatePermissions(id, permissions);
  }

  // POST /users/me/cancel-subscription
  @Patch('me/cancel-subscription')
  async cancelSubscription(@Request() req: any) {
    return this.usersService.cancelSubscription(req.user.userId);
  }
}
