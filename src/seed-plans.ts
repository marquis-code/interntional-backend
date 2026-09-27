import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './subscriptions/subscription.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const subModel = app.get<Model<Subscription>>(getModelToken(Subscription.name));

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
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}
bootstrap();
