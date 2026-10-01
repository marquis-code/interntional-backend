import { UsersService } from './users.service';
import { UserRole, Department } from './schemas/user.schema';
import type { PaginationParams } from '../utils/pagination.util';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createInvitation(dto: {
        email: string;
        role: string;
        adminPlatform: string;
        department?: string;
        permissions: string[];
    }): Promise<import("./schemas/invitation.schema").InvitationDocument>;
    getInvitations(): Promise<import("./schemas/invitation.schema").InvitationDocument[]>;
    getMyDashboardStats(req: any): Promise<{
        documentsUploaded: number;
        mentorshipSessions: number;
        jobsApplied: number;
    }>;
    createCustomRole(dto: {
        name: string;
        permissions: string[];
    }): Promise<import("./schemas/custom-role.schema").CustomRoleDocument>;
    getCustomRoles(): Promise<import("./schemas/custom-role.schema").CustomRoleDocument[]>;
    getPending(query: PaginationParams): Promise<import("../utils/pagination.util").PaginatedResult<any>>;
    getApproved(query: PaginationParams): Promise<import("../utils/pagination.util").PaginatedResult<any>>;
    getAll(query: PaginationParams): Promise<import("../utils/pagination.util").PaginatedResult<any>>;
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
    getMentors(): Promise<import("../utils/pagination.util").PaginatedResult<any>>;
    getByDepartment(department: string): Promise<any[]>;
    getById(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    approve(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    reject(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    revoke(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    updateRole(id: string, role: UserRole): Promise<import("./schemas/user.schema").UserDocument>;
    updateDepartment(id: string, department: Department): Promise<import("./schemas/user.schema").UserDocument>;
    updatePermissions(id: string, permissions: string[]): Promise<import("./schemas/user.schema").UserDocument>;
    cancelSubscription(req: any): Promise<import("./schemas/user.schema").UserDocument>;
}
