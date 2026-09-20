import { UsersService } from './users.service';
import { UserRole, Department } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getPending(): Promise<any[]>;
    getApproved(): Promise<any[]>;
    getAll(): Promise<any[]>;
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
    getMentors(): Promise<any[]>;
    getByDepartment(department: string): Promise<any[]>;
    approve(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    reject(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    revoke(id: string): Promise<import("./schemas/user.schema").UserDocument | null>;
    updateRole(id: string, role: UserRole): Promise<import("./schemas/user.schema").UserDocument>;
    updateDepartment(id: string, department: Department): Promise<import("./schemas/user.schema").UserDocument>;
    updatePermissions(id: string, permissions: string[]): Promise<import("./schemas/user.schema").UserDocument>;
}
