import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User, UserDocument, UserStatus, UserRole, Department, Permission } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(userDto: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async findPendingUsers(): Promise<any[]> {
    return this.userModel.find({ status: UserStatus.PENDING }).lean().exec();
  }

  async findApprovedUsers(): Promise<any[]> {
    return this.userModel.find({ 
      status: UserStatus.APPROVED,
      role: { $ne: UserRole.SUPER_ADMIN } 
    }).select('-passwordHash').lean().exec();
  }

  async findAllUsers(): Promise<any[]> {
    return this.userModel.find({ 
      role: { $ne: UserRole.SUPER_ADMIN } 
    }).select('-passwordHash').lean().exec();
  }

  async findMentors(): Promise<any[]> {
    return this.userModel.find({ 
      status: UserStatus.APPROVED,
      role: UserRole.ALUMNI_MEMBER 
    }).select('-passwordHash').lean().exec();
  }

  async findByDepartment(department: string): Promise<any[]> {
    return this.userModel.find({ 
      department: department as any,
      status: UserStatus.APPROVED,
    }).select('-passwordHash').lean().exec();
  }

  async approveUser(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: UserStatus.APPROVED,
          subscriptionStartDate: new Date(),
        },
      },
      { new: true }
    ).exec();
  }

  async rejectUser(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.REJECTED } },
      { new: true }
    ).exec();
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

  async activateSubscription(userId: string, durationMonths: number): Promise<UserDocument> {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const user = await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        isSubscriptionActive: true,
        subscriptionStartDate: now,
        subscriptionEndDate: endDate,
      },
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
