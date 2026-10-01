"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const events_schema_1 = require("./events/events.schema");
const articles_schema_1 = require("./articles/articles.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const eventModel = app.get((0, mongoose_1.getModelToken)(events_schema_1.Event.name));
        const articleModel = app.get((0, mongoose_1.getModelToken)(articles_schema_1.Article.name));
        console.log('Clearing existing events and articles...');
        await eventModel.deleteMany({});
        await articleModel.deleteMany({});
        console.log('Seeding realistic MLS events...');
        const now = new Date();
        await eventModel.insertMany([
            {
                title: 'Global Health & Pathology Seminar 2026',
                description: 'Join industry-leading pathologists as we take a deep dive into how modern pathology is shaping global health outcomes. This exclusive seminar covers recent outbreaks, rapid diagnostics, and cross-border laboratory networks. Open to all students and interns.',
                date: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
                location: 'Main Auditorium, Virtual Stream Available',
                category: 'Seminar',
                isPublished: true,
            },
            {
                title: 'Annual MLS Networking Mixer',
                description: 'Connect with top pathology labs, hospital directors, and recruiters looking for fresh, talented graduates to join their teams. Bring your CV and prepare for on-the-spot mock interviews and exclusive career advice.',
                date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
                location: 'Innovation Hub, Block B',
                category: 'Networking',
                isPublished: true,
            },
            {
                title: 'Mastering Laboratory Diagnostics: Workshop',
                description: 'Join Dr. Osei as he walks through the latest methodologies in modern clinical diagnostics, focusing on molecular techniques, PCR troubleshooting, and next-generation sequencing basics. Limited seats available for hands-on practical sessions.',
                date: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
                location: 'Lab 3, Science Faculty',
                category: 'Workshop',
                isPublished: true,
            },
            {
                title: 'Quality Assurance & Control in Clinical Labs',
                description: 'A comprehensive webinar detailing the strict standards of quality assurance required in modern medical laboratories. Learn how to maintain ISO 15189 compliance and prevent pre-analytical, analytical, and post-analytical errors.',
                date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
                location: 'Online via Zoom',
                category: 'Webinar',
                isPublished: true,
            }
        ]);
        console.log('Seeding realistic MLS articles...');
        await articleModel.insertMany([
            {
                title: 'The Future of AI in Clinical Pathology',
                excerpt: 'Artificial Intelligence is no longer science fiction. Discover how machine learning algorithms are assisting pathologists in identifying malignant cells faster than ever before.',
                content: 'Artificial Intelligence is revolutionizing clinical pathology. By analyzing thousands of tissue slides in seconds, AI algorithms are significantly reducing human error and expediting diagnostic times. This article explores the current state of AI tools approved for clinical use, how they integrate into existing Laboratory Information Systems (LIS), and what students need to learn to prepare for a tech-driven future in pathology.',
                author: 'Dr. Sarah Jenkins',
                coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
                tags: ['Technology', 'AI', 'Pathology'],
                isPublished: true,
                publishDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                title: 'Navigating Your NYSC Year as an MLS Intern',
                excerpt: 'Your NYSC year is crucial for building practical experience. Learn the top strategies for maximizing your time, networking with senior scientists, and landing a permanent role.',
                content: 'The National Youth Service Corps (NYSC) year can be daunting for Medical Laboratory Scientists. However, it presents a massive opportunity for growth. From selecting the right primary assignment to handling heavy sample workloads under pressure, this guide breaks down everything an intern needs to know to stand out and secure employment post-service.',
                author: 'Michael Adeyemi',
                coverImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
                tags: ['Career', 'NYSC', 'Internship'],
                isPublished: true,
                publishDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            },
            {
                title: 'Breakthroughs in Rapid Diagnostic Tests (RDTs)',
                excerpt: 'Recent advancements in Point-of-Care Testing (POCT) are changing emergency medicine. A review of the latest FDA-approved rapid tests for infectious diseases.',
                content: 'The pandemic accelerated the development of Point-of-Care Testing (POCT) and Rapid Diagnostic Tests (RDTs). Today, we have ultra-sensitive lateral flow assays and handheld PCR devices that deliver results in minutes. We dive into the science behind these breakthroughs, their sensitivity vs. specificity trade-offs, and their impact on rural healthcare.',
                author: 'Prof. Elena Rostova',
                coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80',
                tags: ['Diagnostics', 'Research', 'Infectious Disease'],
                isPublished: true,
                publishDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
            }
        ]);
        console.log('Successfully seeded realistic events and articles!');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed-events-articles.js.map