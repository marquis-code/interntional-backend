"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./users/schemas/user.schema");
const notification_schema_1 = require("./notifications/notification.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: false });
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const notifModel = app.get((0, mongoose_1.getModelToken)(notification_schema_1.Notification.name));
    const emails = ['abahkauzy3@gmail.com', 'ajayiatilola03@gmail.com'];
    for (const email of emails) {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log(`User not found: ${email}`);
            continue;
        }
        const userId = user._id;
        await notifModel.deleteMany({ userId });
        const sampleNotifications = [
            {
                userId,
                title: 'Welcome to the Intern Ecosystem! 🎉',
                message: 'Your account is fully approved. Explore the Vault for study guides, connect with mentors, or browse top clinical listings.',
                type: notification_schema_1.NotificationType.SYSTEM,
                link: '/dashboard/overview',
                isRead: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 15),
            },
            {
                userId,
                title: 'Application Verified & Approved ✅',
                message: 'Congratulations! Your clinical verification documents have been reviewed and approved by the admin team.',
                type: notification_schema_1.NotificationType.APPROVAL,
                link: '/dashboard/overview',
                isRead: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            },
            {
                userId,
                title: 'Basic Plan Membership Active 💳',
                message: 'Your Basic Plan subscription is active. Upgrade anytime to Pro or Premium for 1-on-1 mentorship and full Vault access.',
                type: notification_schema_1.NotificationType.SUBSCRIPTION,
                link: '/dashboard/pricing',
                isRead: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
            },
            {
                userId,
                title: 'Mentorship Matcher Available 🎓',
                message: 'Senior consultants and mentors are now available in your department. Submit a request to get paired with a mentor.',
                type: notification_schema_1.NotificationType.MENTORSHIP,
                link: '/dashboard/mentorship',
                isRead: true,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
            },
        ];
        await notifModel.insertMany(sampleNotifications);
        console.log(`Seeded 4 realistic notifications for ${email}`);
    }
    console.log('Seeding notifications complete.');
    await app.close();
}
bootstrap().catch((err) => {
    console.error('Error seeding notifications:', err);
    process.exit(1);
});
//# sourceMappingURL=seed-notifications.js.map