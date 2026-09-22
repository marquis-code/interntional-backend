const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uri = 'mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional';

mongoose.connect(uri);

mongoose.connection.on('open', async () => {
  console.log('Connected to DB for seeding...');
  const db = mongoose.connection.db;

  try {
    // We do NOT drop users because we want to keep the Super Admin. 
    // We will delete all users EXCEPT the Super Admin.
    await db.collection('users').deleteMany({ role: { $ne: 'SUPER_ADMIN' } });
    await db.collection('jobs').deleteMany({});
    await db.collection('resources').deleteMany({});
    await db.collection('enquiries').deleteMany({});
    await db.collection('subscriptions').deleteMany({});
    await db.collection('payments').deleteMany({});
    await db.collection('analyticsevents').deleteMany({});

    console.log('Cleared existing data (except Super Admin).');

    // 1. Seed Subscriptions
    const subscriptions = [
      {
        name: 'Basic Plan',
        description: 'Standard access for members.',
        price: 500000, // 5000 NGN
        durationMonths: 1,
        features: ['Access to Vault', 'Access to Jobs'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Premium Plan',
        description: 'Premium access with mentorship.',
        price: 1500000, // 15000 NGN
        durationMonths: 3,
        features: ['Access to Vault', 'Access to Jobs', 'Mentorship'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    const subResult = await db.collection('subscriptions').insertMany(subscriptions);
    const subIds = Object.values(subResult.insertedIds);

    // 2. Seed Users
    const departments = ['HEMATOLOGY', 'CHEMICAL_PATHOLOGY', 'MICROBIOLOGY', 'HISTOPATHOLOGY', 'MEDICAL_VIROLOGY', 'GENERAL'];
    const users = [];
    const passwordHash = await bcrypt.hash('password123', 10);
    
    // Generate 20 random users
    for (let i = 0; i < 20; i++) {
      const isApproved = Math.random() > 0.3;
      users.push({
        firstName: `User${i}`,
        lastName: `Test${i}`,
        email: `user${i}@example.com`,
        passwordHash,
        role: Math.random() > 0.7 ? 'ALUMNI_MEMBER' : (Math.random() > 0.5 ? 'INTERN_MEMBER' : 'ADMIN'),
        status: isApproved ? 'APPROVED' : (Math.random() > 0.5 ? 'PENDING' : 'REJECTED'),
        department: departments[Math.floor(Math.random() * departments.length)],
        permissions: [],
        verificationFileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        subscriptionStartDate: isApproved ? new Date() : null,
        subscriptionEndDate: isApproved ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : null,
        isSubscriptionActive: isApproved,
        lastLoginAt: isApproved ? new Date() : null,
        loginCount: isApproved ? Math.floor(Math.random() * 50) : 0,
        createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
        updatedAt: new Date()
      });
    }
    const userResult = await db.collection('users').insertMany(users);
    const userIds = Object.values(userResult.insertedIds);
    const approvedUserIds = users.map((u, i) => u.status === 'APPROVED' ? userIds[i] : null).filter(Boolean);

    // 3. Seed Jobs
    const jobs = [];
    for (let i = 0; i < 25; i++) {
      jobs.push({
        title: `Medical Lab Scientist - Role ${i + 1}`,
        company: `Hospital ${i + 1}`,
        location: i % 2 === 0 ? `Lagos, Nigeria` : `Abuja, Nigeria`,
        description: `This is a highly sought-after role for a medical lab scientist at Hospital ${i + 1}.`,
        link: 'https://example.com/apply',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await db.collection('jobs').insertMany(jobs);

    // 4. Seed Resources
    const resources = [];
    const resourceCategories = ['Study Guide', 'Clinical', 'Video', 'Past Questions'];
    for (let i = 0; i < 40; i++) {
      resources.push({
        title: `Resource ${i + 1}`,
        description: `Comprehensive guide and resource ${i + 1}`,
        category: resourceCategories[Math.floor(Math.random() * resourceCategories.length)],
        type: Math.random() > 0.5 ? 'PDF' : 'Image',
        fileUrl: Math.random() > 0.5 ? 'https://res.cloudinary.com/demo/image/upload/sample.jpg' : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedBy: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await db.collection('resources').insertMany(resources);

    // 5. Seed Enquiries
    const enquiries = [];
    for (let i = 0; i < 8; i++) {
      enquiries.push({
        name: `Enquirer ${i}`,
        email: `contact${i}@example.com`,
        message: `I have a question about my membership ${i}.`,
        status: Math.random() > 0.5 ? 'unread' : 'read',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await db.collection('enquiries').insertMany(enquiries);

    // 6. Seed Payments
    const payments = [];
    for (let i = 0; i < 15; i++) {
      if (!approvedUserIds[i % approvedUserIds.length]) continue;
      payments.push({
        userId: approvedUserIds[i % approvedUserIds.length],
        subscriptionId: subIds[i % subIds.length],
        amount: i % 2 === 0 ? 500000 : 1500000,
        reference: `PAYSTACK_REF_${Date.now()}_${i}`,
        status: 'success',
        paystackResponse: { status: 'success' },
        createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
        updatedAt: new Date(),
      });
    }
    if (payments.length > 0) {
      await db.collection('payments').insertMany(payments);
    }

    // 7. Seed Analytics Events
    const eventsTypes = ['page_view', 'login', 'download', 'job_click', 'enquiry_submit'];
    const analytics = [];
    for (let i = 0; i < 100; i++) {
      const eventType = eventsTypes[Math.floor(Math.random() * eventsTypes.length)];
      analytics.push({
        event: eventType,
        userId: approvedUserIds[Math.floor(Math.random() * approvedUserIds.length)] || null,
        page: eventType === 'page_view' ? '/home' : '',
        metadata: {},
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        department: departments[Math.floor(Math.random() * departments.length)],
        createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
        updatedAt: new Date(),
      });
    }
    await db.collection('analyticsevents').insertMany(analytics);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    process.exit(0);
  }
});
