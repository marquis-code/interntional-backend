import { Model } from 'mongoose';
import { User, UserDocument, UserRole, Department } from './schemas/user.schema';
import { PaginationParams, PaginatedResult } from '../utils/pagination.util';
export declare class UsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    create(userDto: Partial<User>): Promise<UserDocument>;
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
    activateSubscription(userId: string, durationMonths: number): Promise<UserDocument>;
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
