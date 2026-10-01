"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const subscription_schema_1 = require("./subscriptions/subscription.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const subModel = app.get((0, mongoose_1.getModelToken)(subscription_schema_1.Subscription.name));
        console.log('Clearing existing subscriptions...');
        await subModel.deleteMany({});
        console.log('Seeding monthly and annual plans...');
        await subModel.insertMany([
            {
                name: 'Basic Plan',
                description: 'Monthly basic access for students',
                price: 5000,
                durationMonths: 1,
                features: ['Access to Vault', 'Access to Jobs', 'Basic Mentorship'],
                isActive: true,
            },
            {
                name: 'Pro Plan',
                description: 'Annual premium access with dedicated mentorship',
                price: 50000,
                durationMonths: 12,
                features: ['Access to Vault', 'Access to Jobs', 'Premium Mentorship', '1-on-1 Sessions', 'Priority Support'],
                isActive: true,
            }
        ]);
        console.log('Successfully seeded subscriptions!');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed-plans.js.map