import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User, UserDocument, UserStatus, UserRole, Department, Permission } from './schemas/user.schema';
import { Invitation, InvitationDocument } from './schemas/invitation.schema';
import { CustomRole, CustomRoleDocument } from './schemas/custom-role.schema';
import { paginateQuery, PaginationParams, PaginatedResult } from '../utils/pagination.util';
import { EmailService } from '../utils/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    @InjectModel(CustomRole.name) private customRoleModel: Model<CustomRoleDocument>,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByIdWithSubscription(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).populate('activeSubscription').select('-passwordHash').exec();
  }

  async findBySetupToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({
      setupPasswordToken: token,
      setupPasswordExpires: { $gt: new Date() }
    }).exec();
  }

  async updatePasswordAndActivate(id: string, passwordHash: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, {
      $set: { passwordHash },
      $unset: { setupPasswordToken: 1, setupPasswordExpires: 1 }
    }, { new: true }).exec();
  }

  async createAdminInvitation(dto: { email: string, role: string, adminPlatform: string, department?: string, permissions: string[] }): Promise<InvitationDocument> {
    const existingUser = await this.userModel.findOne({ email: dto.email }).exec();
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const invite = new this.invitationModel({
      email: dto.email,
      role: dto.role,
      adminPlatform: dto.adminPlatform,
      permissions: dto.permissions,
      token,
      expiresAt,
    });

    await invite.save();

    // In a real app, send an email here with the token link
    const link = `http://localhost:3000/accept-invite?token=${token}`; // the frontend admin domain would be used
    this.logger.log(`Generated Admin Invite Link: ${link}`);
    
    // We could use emailService if we add an invite email method:
    // await this.emailService.sendAdminInviteEmail(dto.email, token);

    return invite;
  }

  async createCustomRole(name: string, permissions: string[]): Promise<CustomRoleDocument> {
    const existing = await this.customRoleModel.findOne({ name: name.toUpperCase() }).exec();
    if (existing) {
      existing.permissions = permissions;
      return existing.save();
    }
    const role = new this.customRoleModel({ name, permissions });
    return role.save();
  }

  async getCustomRoles(): Promise<CustomRoleDocument[]> {
    return this.customRoleModel.find().exec();
  }

  async getAdminInvitations(): Promise<InvitationDocument[]> {
    return this.invitationModel.find({ isUsed: false, expiresAt: { $gt: new Date() } }).exec();
  }

  async validateInvitation(token: string): Promise<InvitationDocument> {
    const invite = await this.invitationModel.findOne({ token, isUsed: false, expiresAt: { $gt: new Date() } }).exec();
    if (!invite) {
      throw new BadRequestException('Invalid or expired invitation token.');
    }
    return invite;
  }

  async consumeInvitation(token: string): Promise<void> {
    await this.invitationModel.updateOne({ token }, { $set: { isUsed: true } }).exec();
  }

  async setResetPasswordToken(email: string, token: string, expires: Date): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { email },
      { $set: { resetPasswordToken: token, resetPasswordExpires: expires } },
      { new: true }
    ).exec();
  }

  async findByResetToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    }).exec();
  }

  async resetPassword(id: string, passwordHash: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, {
      $set: { passwordHash },
      $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 }
    }, { new: true }).exec();
  }

  async create(userDto: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async getUserDashboardStats(userId: string) {
    // In a real scenario, this would query multiple collections.
    // For now, return aggregate stats to get the frontend unblocked.
    return {
      documentsUploaded: Math.floor(Math.random() * 20) + 1,
      mentorshipSessions: Math.floor(Math.random() * 10),
      jobsApplied: Math.floor(Math.random() * 5),
    };
  }

  async findPendingUsers(params: PaginationParams = {}): Promise<PaginatedResult<any>> {
    const query = { status: UserStatus.PENDING };
    return paginateQuery(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
  }

  async findApprovedUsers(params: PaginationParams = {}): Promise<PaginatedResult<any>> {
    const query = { 
      status: UserStatus.APPROVED,
      role: { $ne: UserRole.SUPER_ADMIN } 
    };
    return paginateQuery(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
  }

  async findAllUsers(params: PaginationParams = {}): Promise<PaginatedResult<any>> {
    const query = { 
      role: { $ne: UserRole.SUPER_ADMIN } 
    };
    return paginateQuery(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
  }

  async findMentors(params: PaginationParams = {}): Promise<PaginatedResult<any>> {
    const query = { 
      status: UserStatus.APPROVED,
      role: UserRole.ALUMNI_MEMBER 
    };
    return paginateQuery(this.userModel, query, params, ['email', 'firstName', 'lastName'], undefined, '-passwordHash');
  }

  async findByDepartment(department: string): Promise<any[]> {
    return this.userModel.find({ 
      department: department as any,
      status: UserStatus.APPROVED,
    }).select('-passwordHash').lean().exec();
  }

  async approveUser(id: string): Promise<UserDocument | null> {
    const userToApprove = await this.userModel.findById(id).exec();
    if (!userToApprove) return null;

    let updateData: any = {
      status: UserStatus.APPROVED,
      subscriptionStartDate: new Date(),
    };

    let setupToken: string | undefined;

    if (!userToApprove.passwordHash) {
      setupToken = crypto.randomBytes(32).toString('hex');
      const expires = new Date();
      expires.setHours(expires.getHours() + 48); // 48 hours to set password
      
      updateData.setupPasswordToken = setupToken;
      updateData.setupPasswordExpires = expires;
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();

    if (user) {
      await this.emailService.sendAccountApprovedEmail(user.email, user.firstName, setupToken, user.role === UserRole.INTERN_MEMBER ? 'intern' : 'universe');
      await this.notificationsService.create({
        userId: user._id.toString(),
        title: 'Application Approved! 🎉',
        message: 'Congratulations! Your verification has been approved. You now have full access to your ecosystem.',
        type: 'APPROVAL',
        link: '/dashboard/overview',
      }).catch((err) => this.logger.error(`Notification error on approval: ${err.message}`));
    }
    return user;
  }

  async rejectUser(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.REJECTED } },
      { new: true }
    ).exec();

    if (user) {
      await this.emailService.sendAccountRejectedEmail(user.email, user.firstName);
      await this.notificationsService.create({
        userId: user._id.toString(),
        title: 'Application Status Update',
        message: 'Your verification documents were reviewed. Please contact support or update your application.',
        type: 'APPROVAL',
      }).catch((err) => this.logger.error(`Notification error on rejection: ${err.message}`));
    }
    return user;
  }

  async updateRole(id: string, role: UserRole): Promise<UserDocument> {
    const validRoles = Object.values(UserRole);
    if (!validRoles.includes(role)) {
      throw new BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }
    const user = await this.userModel.findByIdAndUpdate(id, { $set: { role } }, { new: true }).select('-passwordHash').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateDepartment(id: string, department: Department): Promise<UserDocument> {
    const validDepts = Object.values(Department);
    if (!validDepts.includes(department)) {
      throw new BadRequestException(`Invalid department. Must be one of: ${validDepts.join(', ')}`);
    }
    const user = await this.userModel.findByIdAndUpdate(id, { $set: { department } }, { new: true }).select('-passwordHash').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updatePermissions(id: string, permissions: string[]): Promise<UserDocument> {
    const validPerms = Object.values(Permission);
    const invalid = permissions.filter(p => !validPerms.includes(p as Permission));
    if (invalid.length > 0) {
      throw new BadRequestException(`Invalid permissions: ${invalid.join(', ')}. Must be one of: ${validPerms.join(', ')}`);
    }
    const user = await this.userModel.findByIdAndUpdate(id, { $set: { permissions } }, { new: true }).select('-passwordHash').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async trackLogin(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      $set: { lastLoginAt: new Date() },
      $inc: { loginCount: 1 },
    }).exec();
  }

  async activateSubscription(userId: string, subscriptionId: string, durationMonths: number, authCode?: string): Promise<UserDocument> {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const updateData: any = {
      isSubscriptionActive: true,
      activeSubscription: subscriptionId,
      subscriptionStartDate: now,
      subscriptionEndDate: endDate,
    };
    if (authCode) {
      updateData.paystackAuthCode = authCode;
    }

    const user = await this.userModel.findByIdAndUpdate(userId, {
      $set: updateData,
    }, { new: true }).exec();

    if (!user) throw new NotFoundException('User not found');

    // Fetch plan details to send email
    const SubscriptionModel = this.userModel.db.model('Subscription');
    const plan = await SubscriptionModel.findById(subscriptionId).exec();
    if (plan) {
      const source = user.universityId ? 'universe' : 'intern';
      await this.emailService.sendSubscriptionActivatedEmail(user.email, user.firstName, plan.name, source);
    }

    return user;
  }

  async cancelSubscription(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        isSubscriptionActive: false,
      },
      $unset: {
        paystackAuthCode: 1, // Remove auto-billing auth code so it doesn't charge again
      }
    }, { new: true }).exec();

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getStats() {
    const [
      totalUsers,
      pendingUsers,
      approvedUsers,
      rejectedUsers,
      activeSubscriptions,
      roleBreakdown,
      departmentBreakdown,
      recentSignups,
    ] = await Promise.all([
      this.userModel.countDocuments().exec(),
      this.userModel.countDocuments({ status: UserStatus.PENDING }).exec(),
      this.userModel.countDocuments({ status: UserStatus.APPROVED }).exec(),
      this.userModel.countDocuments({ status: UserStatus.REJECTED }).exec(),
      this.userModel.countDocuments({ isSubscriptionActive: true }).exec(),
      this.userModel.aggregate([
        { $match: { role: { $ne: UserRole.SUPER_ADMIN } } },
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ]).exec(),
      this.userModel.aggregate([
        { $match: { status: UserStatus.APPROVED } },
        { $group: { _id: '$department', count: { $sum: 1 } } },
      ]).exec(),
      this.userModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }).exec(),
    ]);

    return {
      totalUsers,
      pendingUsers,
      approvedUsers,
      rejectedUsers,
      activeSubscriptions,
      recentSignups,
      roleBreakdown: roleBreakdown.reduce((acc, r) => { acc[r._id] = r.count; return acc; }, {}),
      departmentBreakdown: departmentBreakdown.reduce((acc, d) => { acc[d._id] = d.count; return acc; }, {}),
    };
  }

  // Cron job to enforce the 2-Year Cap Rule
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSubscriptionCaps() {
    this.logger.debug('Running daily check for 2-Year Cap Rule on Interns...');
    
    const twoYearsAgo = new Date();
    twoYearsAgo.setMonth(twoYearsAgo.getMonth() - 24);

    const expiredInterns = await this.userModel.find({
      role: UserRole.INTERN_MEMBER,
      subscriptionStartDate: { $lte: twoYearsAgo }
    }).exec();

    if (expiredInterns.length > 0) {
      this.logger.log(`Found ${expiredInterns.length} interns who have reached their 2-year cap. Transitioning to Alumni...`);
      
      const bulkOps = expiredInterns.map(user => ({
        updateOne: {
          filter: { _id: user._id },
          update: { $set: { role: UserRole.ALUMNI_MEMBER } }
        }
      }));

      await this.userModel.bulkWrite(bulkOps);
      this.logger.log(`Successfully transitioned ${expiredInterns.length} users to Alumni status.`);
    } else {
      this.logger.debug('No interns have reached the 2-year cap today.');
    }
  }
}
