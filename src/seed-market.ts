import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bounty } from './bounties/bounty.schema';
import { Product } from './marketplace/marketplace.schema';
import { Subscription } from './subscriptions/subscription.schema';
import { User, UserRole } from './users/schemas/user.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const bountyModel = app.get<Model<Bounty>>(getModelToken(Bounty.name));
  const productModel = app.get<Model<Product>>(getModelToken(Product.name));
  const subscriptionModel = app.get<Model<Subscription>>(getModelToken(Subscription.name));
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  console.log('Seeding Bounties, Marketplace, and Courses...');

  // Get an admin user or create one
  let adminUser = await userModel.findOne({ role: UserRole.SUPER_ADMIN });
  if (!adminUser) {
    adminUser = await userModel.findOne({ email: 'marquis@medlabconvo.com' });
  }
  if (!adminUser) {
    adminUser = await userModel.findOne(); // fallback to any user
  }

  // 1. Seed Bounties
  const bountiesToInsert = [
    {
      title: 'Expert CV Review',
      description: 'Get your CV reviewed by a seasoned professional. Perfect for medical lab scientists looking to optimize their resumes.',
      price: 1500000, // 15,000 NGN
      provider: adminUser?._id,
      category: 'cv_review',
      environment: 'uniVerse',
      isActive: true,
    },
    {
      title: 'Mock Interview Session',
      description: 'A 45-minute 1-on-1 mock interview with personalized feedback and strategies to ace your next job interview.',
      price: 2500000, // 25,000 NGN
      provider: adminUser?._id,
      category: 'mock_interview',
      environment: 'internTional',
      isActive: true,
    },
    {
      title: 'Career Planning Strategy',
      description: 'A deep-dive session into your career goals, helping you build a roadmap for the next 5 years.',
      price: 0, // Free
      provider: adminUser?._id,
      category: 'career_planning',
      environment: 'uniVerse',
      isActive: true,
    },
  ];

  await bountyModel.insertMany(bountiesToInsert);
  console.log('✅ Seeded Bounties');

  // 2. Seed Marketplace Products
  const productsToInsert = [
    {
      title: 'Hematology Study Notes',
      description: 'Comprehensive study notes covering all major topics in hematology. Great for exam prep.',
      price: 500000, // 5,000 NGN
      creator: adminUser?._id,
      coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop',
      fileUrl: 'https://example.com/hematology-notes.pdf',
      category: 'Notes',
      environment: 'uniVerse',
      isApproved: true,
    },
    {
      title: 'Lab Report Templates',
      description: 'Standardized templates for formatting and presenting clinical lab reports professionally.',
      price: 200000, // 2,000 NGN
      creator: adminUser?._id,
      coverImage: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?q=80&w=600&auto=format&fit=crop',
      fileUrl: 'https://example.com/templates.zip',
      category: 'Templates',
      environment: 'internTional',
      isApproved: true,
    },
    {
      title: 'Free Intro Guide',
      description: 'A quick guide to navigating the professional landscape of medical laboratory science.',
      price: 0,
      creator: adminUser?._id,
      fileUrl: 'https://example.com/intro.pdf',
      category: 'Guides',
      environment: 'uniVerse',
      isApproved: true,
    },
  ];

  await productModel.insertMany(productsToInsert);
  console.log('✅ Seeded Marketplace Products');

  // 3. Seed Courses in active subscriptions
  const subs = await subscriptionModel.find();
  if (subs.length > 0) {
    for (const sub of subs) {
      sub.sellarCourses = [
        {
          category: 'Clinical Mastery',
          courses: [
            {
              title: 'Advanced Medical Microbiology Masterclass',
              description: 'Learn advanced diagnostic techniques and modern microbiology automation.',
              link: 'https://example.com/course-1',
              image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop',
            },
            {
              title: 'Quality Assurance in Pathology',
              description: 'Master the QA/QC pipelines required for ISO 15189 compliance.',
              link: 'https://example.com/course-2',
              image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop',
            }
          ]
        },
        {
          category: 'Career Development',
          courses: [
            {
              title: 'Leadership in the Lab',
              description: 'Soft skills and management strategies for aspiring lab managers.',
              link: 'https://example.com/course-3',
            }
          ]
        }
      ];
      await sub.save();
    }
    console.log('✅ Seeded Courses in Subscriptions');
  } else {
    console.log('⚠️ No subscriptions found to attach courses to. Run seed.ts first.');
  }

  console.log('Done seeding market/bounties/courses!');
  await app.close();
}
bootstrap();
