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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env') });
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String },
    status: { type: String },
    verificationFileUrl: { type: String },
});
const User = mongoose_1.default.models.User || mongoose_1.default.model('User', UserSchema);
async function run() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/convo-commerce';
    await mongoose_1.default.connect(uri);
    console.log('Connected to MongoDB');
    const admins = [
        {
            email: 'interntional@medlabconvo.com',
            password: 'Admin@MLS2026!',
            firstName: 'InternTional',
            lastName: 'Admin',
            role: 'SUPER_ADMIN',
            adminPlatform: 'interntional',
        },
        {
            email: 'universe@medlabconvo.com',
            password: 'Univ@MLS2026!',
            firstName: 'UniVerse',
            lastName: 'Admin',
            role: 'SUPER_ADMIN',
            adminPlatform: 'universe',
        },
        {
            email: 'marquis@medlabconvo.com',
            password: 'Marquis@MLS2026!',
            firstName: 'Marquis',
            lastName: 'SuperAdmin',
            role: 'SUPER_ADMIN',
            adminPlatform: 'both',
        }
    ];
    for (const admin of admins) {
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(admin.password, salt);
        await User.findOneAndUpdate({ email: admin.email }, {
            $set: {
                email: admin.email,
                passwordHash,
                firstName: admin.firstName,
                lastName: admin.lastName,
                role: admin.role,
                status: 'APPROVED',
                verificationFileUrl: 'https://example.com/admin.pdf',
                adminPlatform: admin.adminPlatform,
            }
        }, { upsert: true, new: true });
        console.log(`Upserted ${admin.email}`);
    }
    await mongoose_1.default.disconnect();
    console.log('Disconnected');
}
run().catch(console.error);
//# sourceMappingURL=seed-super-admins.js.map