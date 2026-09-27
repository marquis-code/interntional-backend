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

  // Create International User - Free Plan
  let intlFree = await userModel.findOne({ email: 'intl.free@example.com' });
  if (!intlFree) {
    await userModel.create({
      firstName: 'Intl',
      lastName: 'FreeUser',
      email: 'intl.free@example.com',
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
    console.log('Created intl.free@example.com');
  } else {
    console.log('intl.free@example.com already exists');
  }

  // Create International User - Premium Plan
  let intlPremium = await userModel.findOne({ email: 'intl.premium@example.com' });
  if (!intlPremium) {
    await userModel.create({
      firstName: 'Intl',
      lastName: 'PremiumUser',
      email: 'intl.premium@example.com',
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
    console.log('Created intl.premium@example.com');
  } else {
    console.log('intl.premium@example.com already exists');
  }

  // Create Universe User - Free Plan
  let uniFree = await userModel.findOne({ email: 'uni.free@example.com' });
  if (!uniFree) {
    await userModel.create({
      firstName: 'Uni',
      lastName: 'FreeUser',
      email: 'uni.free@example.com',
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
    console.log('Created uni.free@example.com');
  } else {
    console.log('uni.free@example.com already exists');
  }

  // Create Universe User - Premium Plan
  let uniPremium = await userModel.findOne({ email: 'uni.premium@example.com' });
  if (!uniPremium) {
    await userModel.create({
      firstName: 'Uni',
      lastName: 'PremiumUser',
      email: 'uni.premium@example.com',
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
    console.log('Created uni.premium@example.com');
  } else {
    console.log('uni.premium@example.com already exists');
  }

  console.log('Done!');
  await app.close();
}

bootstrap();
