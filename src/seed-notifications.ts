import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users/schemas/user.schema';
import { Notification, NotificationType } from './notifications/notification.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const notifModel = app.get<Model<Notification>>(getModelToken(Notification.name));

  const emails = ['abahkauzy3@gmail.com', 'ajayiatilola03@gmail.com'];

  for (const email of emails) {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      continue;
    }

    const userId = user._id;

    // Remove existing notifications for clean test
    await notifModel.deleteMany({ userId });

    const sampleNotifications = [
      {
        userId,
        title: 'Welcome to the Intern Ecosystem! 🎉',
        message: 'Your account is fully approved. Explore the Vault for study guides, connect with mentors, or browse top clinical listings.',
        type: NotificationType.SYSTEM,
        link: '/dashboard/overview',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      },
      {
        userId,
        title: 'Application Verified & Approved ✅',
        message: 'Congratulations! Your clinical verification documents have been reviewed and approved by the admin team.',
        type: NotificationType.APPROVAL,
        link: '/dashboard/overview',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        userId,
        title: 'Basic Plan Membership Active 💳',
        message: 'Your Basic Plan subscription is active. Upgrade anytime to Pro or Premium for 1-on-1 mentorship and full Vault access.',
        type: NotificationType.SUBSCRIPTION,
        link: '/dashboard/pricing',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        userId,
        title: 'Mentorship Matcher Available 🎓',
        message: 'Senior consultants and mentors are now available in your department. Submit a request to get paired with a mentor.',
        type: NotificationType.MENTORSHIP,
        link: '/dashboard/mentorship',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
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
