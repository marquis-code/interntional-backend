import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserRole, UserStatus, Department } from './users/schemas/user.schema';
import { Payment, PaymentStatus } from './payments/payment.schema';
import { Subscription } from './subscriptions/subscription.schema';
import { Job } from './jobs/schemas/job.schema';
import { Enquiry } from './enquiries/enquiry.schema';
import { Resource } from './resources/schemas/resource.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const paymentModel = app.get<Model<Payment>>(getModelToken(Payment.name));
  const subModel = app.get<Model<Subscription>>(getModelToken(Subscription.name));
  const jobModel = app.get<Model<Job>>(getModelToken(Job.name));
  const enquiryModel = app.get<Model<Enquiry>>(getModelToken(Enquiry.name));
  const resourceModel = app.get<Model<Resource>>(getModelToken(Resource.name));

  console.log('Seeding users and roles...');
  const pass = await bcrypt.hash('password123', 10);
  
  const usersToInsert: any[] = [];
  const roles = [UserRole.ADMIN, UserRole.MODERATOR, UserRole.DEPARTMENT_HEAD, UserRole.INTERN_MEMBER, UserRole.ALUMNI_MEMBER];
  
  for(let i=0; i<15; i++) {
    usersToInsert.push({
      firstName: `Test${i}`,
      lastName: `User${i}`,
      email: `test${i}@example.com`,
      passwordHash: pass,
      role: roles[i % roles.length],
      status: i % 2 === 0 ? UserStatus.APPROVED : UserStatus.PENDING,
      department: Department.HEMATOLOGY,
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
  for(let i=0; i<10; i++) {
    await paymentModel.create({
      userId: insertedUsers[0]._id,
      subscriptionId: sub1._id,
      amount: 500000,
      reference: `REF_${Date.now()}_${i}`,
      status: i % 2 === 0 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
    });
  }

  console.log('Seeding jobs...');
  for(let i=0; i<8; i++) {
    await jobModel.create({
      title: `Medical Lab Scientist ${i}`,
      company: `Hospital ${i}`,
      location: `Lagos ${i}`,
      description: 'Job description goes here.',
      link: 'https://example.com/apply',
    });
  }

  console.log('Seeding enquiries...');
  for(let i=0; i<5; i++) {
    await enquiryModel.create({
      name: `Sender ${i}`,
      email: `sender${i}@example.com`,
      message: 'Hello, I have an enquiry about the program.',
    });
  }

  console.log('Seeding resources...');
  for(let i=0; i<6; i++) {
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
