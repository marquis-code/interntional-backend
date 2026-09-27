import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserRole, UserStatus, Department } from './users/schemas/user.schema';
import { Subscription } from './subscriptions/subscription.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const subModel = app.get<Model<Subscription>>(getModelToken(Subscription.name));

  const pass = await bcrypt.hash('password123', 10);

  // Let's make sure we have a couple of plans
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
      price: 50000, // 500 NGN
      durationMonths: 1,
      features: ['All features', 'Vault', 'Articles'],
      isActive: true,
      canAccessVault: true,
      canPostArticles: true,
    });
  }

  // Create International User - Free Plan v2
  let intlFree = await userModel.findOne({ email: 'intl.free2@example.com' });
  if (!intlFree) {
    await userModel.create({
      firstName: 'Intl2',
      lastName: 'FreeUser2',
      email: 'intl.free2@example.com',
      passwordHash: pass,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
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
  } else {
    console.log('intl.free2@example.com already exists');
  }

  // Create International User - Premium Plan v2
  let intlPremium = await userModel.findOne({ email: 'intl.premium2@example.com' });
  if (!intlPremium) {
    await userModel.create({
      firstName: 'Intl2',
      lastName: 'PremiumUser2',
      email: 'intl.premium2@example.com',
      passwordHash: pass,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
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
  } else {
    console.log('intl.premium2@example.com already exists');
  }

  // Create Universe User - Free Plan v2
  let uniFree = await userModel.findOne({ email: 'uni.free2@example.com' });
  if (!uniFree) {
    await userModel.create({
      firstName: 'Uni2',
      lastName: 'FreeUser2',
      email: 'uni.free2@example.com',
      passwordHash: pass,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
      verificationFileUrl: 'https://example.com/file.pdf',
      universityId: new Types.ObjectId(), 
      programmeId: new Types.ObjectId(),
      activeSubscription: freePlan._id,
      isSubscriptionActive: true,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    console.log('Created uni.free2@example.com');
  } else {
    console.log('uni.free2@example.com already exists');
  }

  // Create Universe User - Premium Plan v2
  let uniPremium = await userModel.findOne({ email: 'uni.premium2@example.com' });
  if (!uniPremium) {
    await userModel.create({
      firstName: 'Uni2',
      lastName: 'PremiumUser2',
      email: 'uni.premium2@example.com',
      passwordHash: pass,
      role: UserRole.INTERN_MEMBER,
      status: UserStatus.APPROVED,
      department: Department.GENERAL,
      verificationFileUrl: 'https://example.com/file.pdf',
      universityId: new Types.ObjectId(), 
      programmeId: new Types.ObjectId(),
      activeSubscription: premiumPlan._id,
      isSubscriptionActive: true,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    console.log('Created uni.premium2@example.com');
  } else {
    console.log('uni.premium2@example.com already exists');
  }

  console.log('Done!');
  await app.close();
}

bootstrap();
