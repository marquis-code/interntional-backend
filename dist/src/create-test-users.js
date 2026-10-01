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
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./users/schemas/user.schema");
const subscription_schema_1 = require("./subscriptions/subscription.schema");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const subModel = app.get((0, mongoose_1.getModelToken)(subscription_schema_1.Subscription.name));
    const pass = await bcrypt.hash('password123', 10);
    let freePlan = await subModel.findOne({ name: 'Free Plan' });
    if (!freePlan) {
        freePlan = await subModel.create({
            name: 'Free Plan',
            description: 'Free basic access',
            price: 0,
            durationMonths: 1,
            features: ['Basic features'],
            isActive: true,
            canAccessVault: false,
            canPostArticles: false,
        });
    }
    let premiumPlan = await subModel.findOne({ name: 'Premium Plan' });
    if (!premiumPlan) {
        premiumPlan = await subModel.create({
            name: 'Premium Plan',
            description: 'Full premium access',
            price: 50000,
            durationMonths: 1,
            features: ['All features', 'Vault', 'Articles'],
            isActive: true,
            canAccessVault: true,
            canPostArticles: true,
        });
    }
    let intlFree = await userModel.findOne({ email: 'intl.free2@example.com' });
    if (!intlFree) {
        await userModel.create({
            firstName: 'Intl2',
            lastName: 'FreeUser2',
            email: 'intl.free2@example.com',
            passwordHash: pass,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://example.com/file.pdf',
            country: 'UK',
            phoneNumber: '+44123456789',
            professionalBackground: 'Doctor',
            activeSubscription: freePlan._id,
            isSubscriptionActive: true,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        console.log('Created intl.free2@example.com');
    }
    else {
        console.log('intl.free2@example.com already exists');
    }
    let intlPremium = await userModel.findOne({ email: 'intl.premium2@example.com' });
    if (!intlPremium) {
        await userModel.create({
            firstName: 'Intl2',
            lastName: 'PremiumUser2',
            email: 'intl.premium2@example.com',
            passwordHash: pass,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://example.com/file.pdf',
            country: 'UK',
            phoneNumber: '+44987654321',
            professionalBackground: 'Surgeon',
            activeSubscription: premiumPlan._id,
            isSubscriptionActive: true,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        console.log('Created intl.premium2@example.com');
    }
    else {
        console.log('intl.premium2@example.com already exists');
    }
    let uniFree = await userModel.findOne({ email: 'uni.free2@example.com' });
    if (!uniFree) {
        await userModel.create({
            firstName: 'Uni2',
            lastName: 'FreeUser2',
            email: 'uni.free2@example.com',
            passwordHash: pass,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://example.com/file.pdf',
            universityId: new mongoose_2.Types.ObjectId(),
            programmeId: new mongoose_2.Types.ObjectId(),
            activeSubscription: freePlan._id,
            isSubscriptionActive: true,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        console.log('Created uni.free2@example.com');
    }
    else {
        console.log('uni.free2@example.com already exists');
    }
    let uniPremium = await userModel.findOne({ email: 'uni.premium2@example.com' });
    if (!uniPremium) {
        await userModel.create({
            firstName: 'Uni2',
            lastName: 'PremiumUser2',
            email: 'uni.premium2@example.com',
            passwordHash: pass,
            role: user_schema_1.UserRole.INTERN_MEMBER,
            status: user_schema_1.UserStatus.APPROVED,
            department: user_schema_1.Department.GENERAL,
            verificationFileUrl: 'https://example.com/file.pdf',
            universityId: new mongoose_2.Types.ObjectId(),
            programmeId: new mongoose_2.Types.ObjectId(),
            activeSubscription: premiumPlan._id,
            isSubscriptionActive: true,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        console.log('Created uni.premium2@example.com');
    }
    else {
        console.log('uni.premium2@example.com already exists');
    }
    console.log('Done!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=create-test-users.js.map