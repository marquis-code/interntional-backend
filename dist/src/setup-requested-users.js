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
const subscription_schema_1 = require("./subscriptions/subscription.schema");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: false });
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const subModel = app.get((0, mongoose_1.getModelToken)(subscription_schema_1.Subscription.name));
    const passwordHash = await bcrypt.hash('password123', 10);
    let basicPlan = await subModel.findOne({ name: 'Basic Plan' });
    if (!basicPlan) {
        basicPlan = await subModel.findOne({ price: { $gt: 0 } });
    }
    const intlEmail = 'abahkauzy3@gmail.com'.toLowerCase().trim();
    let intlUser = await userModel.findOne({ email: intlEmail });
    if (intlUser) {
        intlUser.passwordHash = passwordHash;
        intlUser.status = user_schema_1.UserStatus.APPROVED;
        intlUser.role = user_schema_1.UserRole.INTERN_MEMBER;
        intlUser.country = 'Nigeria';
        intlUser.phoneNumber = '+2348000000001';
        intlUser.professionalBackground = 'Medical Laboratory Scientist';
        await intlUser.save();
        console.log(`Updated existing International user: ${intlEmail}`);
    }
    else {
        intlUser = await userModel.create({
            firstName: 'Abah',
            lastName: 'Kauzy',
            email: intlEmail,
            passwordHash: passwordHash,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
            country: 'Nigeria',
            phoneNumber: '+2348000000001',
            professionalBackground: 'Medical Laboratory Scientist',
            isSubscriptionActive: false,
        });
        console.log(`Created new International user: ${intlEmail}`);
    }
    const uniEmail = 'ajayiatilola03@gmail.com'.toLowerCase().trim();
    let uniUser = await userModel.findOne({ email: uniEmail });
    const startDate = new Date();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (uniUser) {
        uniUser.passwordHash = passwordHash;
        uniUser.status = user_schema_1.UserStatus.APPROVED;
        uniUser.role = user_schema_1.UserRole.INTERN_MEMBER;
        uniUser.activeSubscription = basicPlan?._id;
        uniUser.isSubscriptionActive = true;
        uniUser.subscriptionStartDate = startDate;
        uniUser.subscriptionEndDate = endDate;
        await uniUser.save();
        console.log(`Updated existing Universe paid user: ${uniEmail} with plan: ${basicPlan?.name}`);
    }
    else {
        uniUser = await userModel.create({
            firstName: 'Atilola',
            lastName: 'Ajayi',
            email: uniEmail,
            passwordHash: passwordHash,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
            activeSubscription: basicPlan?._id,
            isSubscriptionActive: true,
            subscriptionStartDate: startDate,
            subscriptionEndDate: endDate,
        });
        console.log(`Created new Universe paid user: ${uniEmail} with plan: ${basicPlan?.name}`);
    }
    console.log('\n--- SETUP SUMMARY ---');
    console.log(`1. International User:`);
    console.log(`   Email: ${intlEmail}`);
    console.log(`   Password: password123`);
    console.log(`   Status: APPROVED`);
    console.log(`   Role: INTERN_MEMBER`);
    console.log(`2. Universe User (Paid Account for upgrade testing):`);
    console.log(`   Email: ${uniEmail}`);
    console.log(`   Password: password123`);
    console.log(`   Status: APPROVED`);
    console.log(`   Active Plan: ${basicPlan?.name} (Expires in 30 days)`);
    console.log(`   Role: INTERN_MEMBER`);
    await app.close();
}
bootstrap().catch((err) => {
    console.error('Error setting up users:', err);
    process.exit(1);
});
//# sourceMappingURL=setup-requested-users.js.map