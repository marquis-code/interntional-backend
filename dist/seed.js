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
const payment_schema_1 = require("./payments/payment.schema");
const subscription_schema_1 = require("./subscriptions/subscription.schema");
const job_schema_1 = require("./jobs/schemas/job.schema");
const enquiry_schema_1 = require("./enquiries/enquiry.schema");
const resource_schema_1 = require("./resources/schemas/resource.schema");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const paymentModel = app.get((0, mongoose_1.getModelToken)(payment_schema_1.Payment.name));
    const subModel = app.get((0, mongoose_1.getModelToken)(subscription_schema_1.Subscription.name));
    const jobModel = app.get((0, mongoose_1.getModelToken)(job_schema_1.Job.name));
    const enquiryModel = app.get((0, mongoose_1.getModelToken)(enquiry_schema_1.Enquiry.name));
    const resourceModel = app.get((0, mongoose_1.getModelToken)(resource_schema_1.Resource.name));
    console.log('Seeding users and roles...');
    const pass = await bcrypt.hash('password123', 10);
    const usersToInsert = [];
    const roles = [user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MODERATOR, user_schema_1.UserRole.DEPARTMENT_HEAD, user_schema_1.UserRole.INTERN_MEMBER, user_schema_1.UserRole.ALUMNI_MEMBER];
    for (let i = 0; i < 15; i++) {
        usersToInsert.push({
            firstName: `Test${i}`,
            lastName: `User${i}`,
            email: `test${i}@example.com`,
            passwordHash: pass,
            role: roles[i % roles.length],
            status: i % 2 === 0 ? user_schema_1.UserStatus.APPROVED : user_schema_1.UserStatus.PENDING,
            department: user_schema_1.Department.HEMATOLOGY,
            verificationFileUrl: 'https://example.com/file.pdf',
        });
    }
    const insertedUsers = await userModel.insertMany(usersToInsert);
    console.log('Seeding subscriptions...');
    const sub1 = await subModel.create({
        name: 'Basic Plan',
        description: 'Basic access',
        price: 500000,
        durationMonths: 1,
        features: ['A', 'B'],
        isActive: true,
    });
    console.log('Seeding payments...');
    for (let i = 0; i < 10; i++) {
        await paymentModel.create({
            userId: insertedUsers[0]._id,
            subscriptionId: sub1._id,
            amount: 500000,
            reference: `REF_${Date.now()}_${i}`,
            status: i % 2 === 0 ? payment_schema_1.PaymentStatus.SUCCESS : payment_schema_1.PaymentStatus.FAILED,
        });
    }
    console.log('Seeding jobs...');
    for (let i = 0; i < 8; i++) {
        await jobModel.create({
            title: `Medical Lab Scientist ${i}`,
            company: `Hospital ${i}`,
            location: `Lagos ${i}`,
            description: 'Job description goes here.',
            link: 'https://example.com/apply',
        });
    }
    console.log('Seeding enquiries...');
    for (let i = 0; i < 5; i++) {
        await enquiryModel.create({
            name: `Sender ${i}`,
            email: `sender${i}@example.com`,
            message: 'Hello, I have an enquiry about the program.',
        });
    }
    console.log('Seeding resources...');
    for (let i = 0; i < 6; i++) {
        await resourceModel.create({
            title: `Study Material ${i}`,
            description: 'Material description',
            category: 'CLINICAL',
            type: 'PDF',
            fileUrl: 'https://example.com/material.pdf',
            uploadedBy: String(insertedUsers[0]._id),
        });
    }
    console.log('Done seeding!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map