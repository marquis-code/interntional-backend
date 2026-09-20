import { Controller, Get, Patch, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles, Permissions } from '../auth/decorators';
import { UserRole, Department } from './schemas/user.schema';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/pending – list pending users (for admin dashboard)
  @UseInterceptors(CacheInterceptor)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Get('pending')
  async getPending() {
    return this.usersService.findPendingUsers();
  }

  // GET /users/approved – list approved users
  @UseInterceptors(CacheInterceptor)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR)
  @Get('approved')
  async getApproved() {
    return this.usersService.findApprovedUsers();
  }

  // GET /users/all – list all users (for roles management page)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get('all')
  async getAll() {
    return this.usersService.findAllUsers();
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
}
