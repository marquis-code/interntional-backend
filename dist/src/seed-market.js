"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const bounty_schema_1 = require("./bounties/bounty.schema");
const marketplace_schema_1 = require("./marketplace/marketplace.schema");
const subscription_schema_1 = require("./subscriptions/subscription.schema");
const user_schema_1 = require("./users/schemas/user.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const bountyModel = app.get((0, mongoose_1.getModelToken)(bounty_schema_1.Bounty.name));
    const productModel = app.get((0, mongoose_1.getModelToken)(marketplace_schema_1.Product.name));
    const subscriptionModel = app.get((0, mongoose_1.getModelToken)(subscription_schema_1.Subscription.name));
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    console.log('Seeding Bounties, Marketplace, and Courses...');
    let adminUser = await userModel.findOne({ role: user_schema_1.UserRole.SUPER_ADMIN });
    if (!adminUser) {
        adminUser = await userModel.findOne({ email: 'marquis@medlabconvo.com' });
    }
    if (!adminUser) {
        adminUser = await userModel.findOne();
    }
    const bountiesToInsert = [
        {
            title: 'Expert CV Review',
            description: 'Get your CV reviewed by a seasoned professional. Perfect for medical lab scientists looking to optimize their resumes.',
            price: 1500000,
            provider: adminUser?._id,
            category: 'cv_review',
            environment: 'uniVerse',
            isActive: true,
        },
        {
            title: 'Mock Interview Session',
            description: 'A 45-minute 1-on-1 mock interview with personalized feedback and strategies to ace your next job interview.',
            price: 2500000,
            provider: adminUser?._id,
            category: 'mock_interview',
            environment: 'internTional',
            isActive: true,
        },
        {
            title: 'Career Planning Strategy',
            description: 'A deep-dive session into your career goals, helping you build a roadmap for the next 5 years.',
            price: 0,
            provider: adminUser?._id,
            category: 'career_planning',
            environment: 'uniVerse',
            isActive: true,
        },
    ];
    await bountyModel.insertMany(bountiesToInsert);
    console.log('✅ Seeded Bounties');
    const productsToInsert = [
        {
            title: 'Hematology Study Notes',
            description: 'Comprehensive study notes covering all major topics in hematology. Great for exam prep.',
            price: 500000,
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
            price: 200000,
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
    }
    else {
        console.log('⚠️ No subscriptions found to attach courses to. Run seed.ts first.');
    }
    console.log('Done seeding market/bounties/courses!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed-market.js.map