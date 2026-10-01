import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserRole, UserStatus, Department } from './users/schemas/user.schema';
import { Subscription } from './subscriptions/subscription.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const subModel = app.get<Model<Subscription>>(getModelToken(Subscription.name));

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Find Basic Plan for paid user
  let basicPlan = await subModel.findOne({ name: 'Basic Plan' });
  if (!basicPlan) {
    basicPlan = await subModel.findOne({ price: { $gt: 0 } });
  }

  // 2. Setup International User: abahkauzy3@gmail.com
  const intlEmail = 'abahkauzy3@gmail.com'.toLowerCase().trim();
  let intlUser = await userModel.findOne({ email: intlEmail });
  if (intlUser) {
    intlUser.passwordHash = passwordHash;
    intlUser.status = UserStatus.APPROVED;
    intlUser.role = UserRole.INTERN_MEMBER;
    intlUser.country = 'Nigeria';
    intlUser.phoneNumber = '+2348000000001';
    intlUser.professionalBackground = 'Medical Laboratory Scientist';
    await intlUser.save();
    console.log(`Updated existing International user: ${intlEmail}`);
  } else {
    intlUser = await userModel.create({
      firstName: 'Abah',
      lastName: 'Kauzy',
      email: intlEmail,
      passwordHash: passwordHash,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
      verificationFileUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
      country: 'Nigeria',
      phoneNumber: '+2348000000001',
      professionalBackground: 'Medical Laboratory Scientist',
      isSubscriptionActive: false,
    });
    console.log(`Created new International user: ${intlEmail}`);
  }

  // 3. Setup Universe Paid User: ajayiatilola03@gmail.com
  const uniEmail = 'ajayiatilola03@gmail.com'.toLowerCase().trim();
  let uniUser = await userModel.findOne({ email: uniEmail });
  const startDate = new Date();
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  if (uniUser) {
    uniUser.passwordHash = passwordHash;
    uniUser.status = UserStatus.APPROVED;
    uniUser.role = UserRole.INTERN_MEMBER;
    uniUser.activeSubscription = basicPlan?._id as any;
    uniUser.isSubscriptionActive = true;
    uniUser.subscriptionStartDate = startDate;
    uniUser.subscriptionEndDate = endDate;
    await uniUser.save();
    console.log(`Updated existing Universe paid user: ${uniEmail} with plan: ${basicPlan?.name}`);
  } else {
    uniUser = await userModel.create({
      firstName: 'Atilola',
      lastName: 'Ajayi',
      email: uniEmail,
      passwordHash: passwordHash,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
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
