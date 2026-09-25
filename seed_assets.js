const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/convo-commerce?retryWrites=true&w=majority'; // I need to get the real URI from .env

async function seed() {
  try {
    require('dotenv').config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const resourceSchema = new mongoose.Schema({
      title: String,
      description: String,
      category: String,
      type: String,
      fileUrl: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

    const dummyAssets = [
      {
        title: 'Complete Hematology Reference',
        description: 'A comprehensive guide to blood cells.',
        category: 'Study Guide',
        type: 'PDF',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/sample.jpg'
      },
      {
        title: 'Microbiology Lab Protocol',
        description: 'Standard operating procedures for microbiology.',
        category: 'Clinical',
        type: 'PDF',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/sample.jpg'
      },
      {
        title: 'Pathology Slide Images',
        description: 'High resolution slide images.',
        category: 'Study Guide',
        type: 'Image',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/sample.jpg'
      },
      {
        title: 'Sample Exam Questions 2024',
        description: 'Past questions for practice.',
        category: 'Past Questions',
        type: 'PDF',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/sample.jpg'
      }
    ];

    await Resource.insertMany(dummyAssets);
    console.log('Successfully seeded resources');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding', err);
    process.exit(1);
  }
}

seed();
