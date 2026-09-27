import { Model } from 'mongoose';
import { User, UserDocument, UserRole, Department } from './schemas/user.schema';
import { PaginationParams, PaginatedResult } from '../utils/pagination.util';
import { EmailService } from '../utils/email.service';
export declare class UsersService {
    private userModel;
    private emailService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, emailService: EmailService);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    findByIdWithSubscription(id: string): Promise<UserDocument | null>;
    findBySetupToken(token: string): Promise<UserDocument | null>;
    updatePasswordAndActivate(id: string, passwordHash: string): Promise<UserDocument | null>;
    setResetPasswordToken(email: string, token: string, expires: Date): Promise<UserDocument | null>;
    findByResetToken(token: string): Promise<UserDocument | null>;
    resetPassword(id: string, passwordHash: string): Promise<UserDocument | null>;
    create(userDto: Partial<User>): Promise<UserDocument>;
    getUserDashboardStats(userId: string): Promise<{
        documentsUploaded: number;
        mentorshipSessions: number;
        jobsApplied: number;
    }>;
    findPendingUsers(params?: PaginationParams): Promise<PaginatedResult<any>>;
    findApprovedUsers(params?: PaginationParams): Promise<PaginatedResult<any>>;
    findAllUsers(params?: PaginationParams): Promise<PaginatedResult<any>>;
    findMentors(params?: PaginationParams): Promise<PaginatedResult<any>>;
    findByDepartment(department: string): Promise<any[]>;
    approveUser(id: string): Promise<UserDocument | null>;
    rejectUser(id: string): Promise<UserDocument | null>;
    updateRole(id: string, role: UserRole): Promise<UserDocument>;
    updateDepartment(id: string, department: Department): Promise<UserDocument>;
    updatePermissions(id: string, permissions: string[]): Promise<UserDocument>;
    trackLogin(id: string): Promise<void>;
    activateSubscription(userId: string, subscriptionId: string, durationMonths: number, authCode?: string): Promise<UserDocument>;
    cancelSubscription(userId: string): Promise<UserDocument>;
    getStats(): Promise<{
        totalUsers: number;
        pendingUsers: number;
        approvedUsers: number;
        rejectedUsers: number;
        activeSubscriptions: number;
        recentSignups: number;
        roleBreakdown: any;
        departmentBreakdown: any;
    }>;
    handleSubscriptionCaps(): Promise<void>;
}
