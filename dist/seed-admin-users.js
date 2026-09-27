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
const ADMIN_USERS = [
    {
        firstName: 'InternTional',
        lastName: 'Admin',
        email: 'interntional@medlabconvo.com',
        tempPassword: 'Admin@MLS2026!',
    },
    {
        firstName: 'Universe',
        lastName: 'Admin',
        email: 'universe@medlabconvo.com',
        tempPassword: 'Univ@MLS2026!',
    },
    {
        firstName: 'Marquis',
        lastName: 'Admin',
        email: 'marquis@medlabconvo.com',
        tempPassword: 'Marquis@MLS2026!',
    },
];
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    try {
        for (const admin of ADMIN_USERS) {
            const existing = await userModel.findOne({ email: admin.email });
            const passwordHash = await bcrypt.hash(admin.tempPassword, 10);
            if (existing) {
                await userModel.findByIdAndUpdate(existing._id, {
                    role: user_schema_1.UserRole.SUPER_ADMIN,
                    status: user_schema_1.UserStatus.APPROVED,
                    passwordHash,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                });
                console.log(`Updated admin: ${admin.email} | Password: ${admin.tempPassword}`);
            }
            else {
                await userModel.create({
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    email: admin.email,
                    passwordHash,
                    role: user_schema_1.UserRole.SUPER_ADMIN,
                    status: user_schema_1.UserStatus.APPROVED,
                    department: user_schema_1.Department.GENERAL,
                    verificationFileUrl: 'https://example.com/admin.pdf',
                    country: 'Nigeria',
                    phoneNumber: '+2340000000000',
                    professionalBackground: 'Administrator',
                });
                console.log(`Created admin: ${admin.email} | Password: ${admin.tempPassword}`);
            }
        }
        console.log('\n✅ Admin users seeded successfully!');
        console.log('\n=== ADMIN CREDENTIALS ===');
        ADMIN_USERS.forEach(u => {
            console.log(`Email: ${u.email} | Password: ${u.tempPassword}`);
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