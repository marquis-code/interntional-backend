import { UsersService } from './users.service';
import { UserRole, Department } from './schemas/user.schema';
import type { PaginationParams } from '../utils/pagination.util';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    approve(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    reject(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    revoke(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    updateRole(id: string, role: UserRole): Promise<import("./schemas/user.schema").UserDocument>;
    updateDepartment(id: string, department: Department): Promise<import("./schemas/user.schema").UserDocument>;
    updatePermissions(id: string, permissions: string[]): Promise<import("./schemas/user.schema").UserDocument>;
}
