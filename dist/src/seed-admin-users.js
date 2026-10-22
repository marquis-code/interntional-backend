"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./users/schemas/user.schema");
const bcrypt = __importStar(require("bcrypt"));
const ALL_PERMISSIONS = [
    'manage_users',
    'approve_documents',
    'manage_subscriptions',
    'manage_payments',
    'manage_content',
    'view_analytics',
    'manage_jobs',
    'manage_enquiries',
    'manage_roles',
    'view_users', 'create_users', 'edit_users', 'delete_users',
    'view_roles', 'create_roles', 'edit_roles', 'delete_roles',
    'view_vault', 'create_vault', 'edit_vault', 'delete_vault',
    'view_jobs', 'create_jobs', 'edit_jobs', 'delete_jobs',
    'view_mentorship', 'create_mentorship', 'edit_mentorship', 'delete_mentorship',
    'view_courses', 'create_courses', 'edit_courses', 'delete_courses',
    'view_marketplace', 'create_marketplace', 'edit_marketplace', 'delete_marketplace',
    'view_bounties', 'create_bounties', 'edit_bounties', 'delete_bounties',
    'view_events', 'create_events', 'edit_events', 'delete_events',
    'view_content', 'create_content', 'edit_content', 'delete_content',
    'view_forms', 'create_forms', 'edit_forms', 'delete_forms',
    'view_enquiries', 'create_enquiries', 'edit_enquiries', 'delete_enquiries',
    'view_subscriptions', 'create_subscriptions', 'edit_subscriptions', 'delete_subscriptions',
    'view_payments', 'create_payments', 'edit_payments', 'delete_payments',
    'view_analytics', 'create_analytics', 'edit_analytics', 'delete_analytics',
];
const ADMIN_USERS = [
    {
        firstName: 'InternTional',
        lastName: 'Admin',
        email: 'interntional@medlabconvo.com',
        role: user_schema_1.UserRole.SUPER_ADMIN,
        adminPlatform: 'interntional',
        tempPassword: 'Admin@MLS2026!',
    },
    {
        firstName: 'Universe',
        lastName: 'Admin',
        email: 'universe@medlabconvo.com',
        role: user_schema_1.UserRole.SUPER_ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'Univ@MLS2026!',
    },
    {
        firstName: 'Marquis',
        lastName: 'Admin',
        email: 'marquis@medlabconvo.com',
        role: user_schema_1.UserRole.SUPER_ADMIN,
        adminPlatform: 'both',
        tempPassword: 'Marquis@MLS2026!',
    },
    {
        firstName: 'Oluwamuyiwa',
        lastName: 'Admin',
        email: 'oluwamuyiwa@medlabconvo.com',
        role: user_schema_1.UserRole.SUPER_ADMIN,
        adminPlatform: 'both',
        tempPassword: 'Oluwamuyiwa@MLS2026!',
    },
    {
        firstName: 'Zekeri',
        lastName: 'Suleiman',
        email: 'zekerisuleiman6@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Andy',
        lastName: 'Etinosa',
        email: 'andyetinosa05@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Oge',
        lastName: 'Ibe',
        email: 'oge.ibe55@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Folamide',
        lastName: 'Admin',
        email: 'folamide334@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Miracle',
        lastName: 'Admin',
        email: 'miracle@medlabconvo.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Oyindamola',
        lastName: 'Admin',
        email: 'oyindamola@medlabconvo.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Michael',
        lastName: 'Ezeagu',
        email: 'ezeagumichael290307@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Gospel',
        lastName: 'Aiuagelemon',
        email: 'gospelaiuagelemon@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
    {
        firstName: 'Raphael',
        lastName: 'Ojeka',
        email: 'ojekaraphael6@gmail.com',
        role: user_schema_1.UserRole.ADMIN,
        adminPlatform: 'universe',
        tempPassword: 'UniVerse@Tech2026!',
    },
];
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    try {
        for (const admin of ADMIN_USERS) {
            const normalizedEmail = admin.email.toLowerCase().trim();
            const existing = await userModel.findOne({ email: normalizedEmail });
            const passwordHash = await bcrypt.hash(admin.tempPassword, 10);
            if (existing) {
                await userModel.findByIdAndUpdate(existing._id, {
                    role: admin.role,
                    status: user_schema_1.UserStatus.APPROVED,
                    adminPlatform: admin.adminPlatform,
                    permissions: ALL_PERMISSIONS,
                    passwordHash,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                });
                console.log(`Updated admin: ${normalizedEmail} | Role: ${admin.role} | Platform: ${admin.adminPlatform}`);
            }
            else {
                await userModel.create({
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    email: normalizedEmail,
                    passwordHash,
                    role: admin.role,
                    status: user_schema_1.UserStatus.APPROVED,
                    adminPlatform: admin.adminPlatform,
                    permissions: ALL_PERMISSIONS,
                    department: user_schema_1.Department.GENERAL,
                    verificationFileUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
                    country: 'Nigeria',
                    phoneNumber: '+2340000000000',
                    professionalBackground: 'Technical Team Administrator',
                });
                console.log(`Created admin: ${normalizedEmail} | Role: ${admin.role} | Platform: ${admin.adminPlatform}`);
            }
        }
        console.log('\n✅ Admin & Technical Team users seeded successfully!');
        console.log('\n=== ADMIN CREDENTIALS ===');
        ADMIN_USERS.forEach(u => {
            console.log(`Email: ${u.email.toLowerCase().trim()} | Role: ${u.role} | Platform: ${u.adminPlatform} | Password: ${u.tempPassword}`);
        });
    }
    catch (error) {
        console.error('Error seeding admin users:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed-admin-users.js.map