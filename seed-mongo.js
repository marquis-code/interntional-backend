const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb://localhost:27017/lapadia-fresh"; // default
// But wait, the app uses config. I can check .env

async function seed() {
  const client = new MongoClient("mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional");
  await client.connect();
  const db = client.db();

  console.log("Connected. Seeding...");

  // Users
  const usersColl = db.collection('users');
  const pass = await bcrypt.hash('password123', 10);
  const roles = ['ADMIN', 'MODERATOR', 'DEPARTMENT_HEAD', 'INTERN_MEMBER', 'ALUMNI_MEMBER'];
  const depts = ['HEMATOLOGY', 'CHEMICAL_PATHOLOGY', 'MICROBIOLOGY', 'HISTOPATHOLOGY', 'GENERAL'];
  
  const fakeUsers = [];
  for (let i = 0; i < 20; i++) {
    fakeUsers.push({
      firstName: `User${i}`,
      lastName: `Seeded`,
      email: `user${i}@example.com`,
      passwordHash: pass,
      role: roles[i % roles.length],
      status: i % 3 === 0 ? 'PENDING' : 'APPROVED',
      department: depts[i % depts.length],
      permissions: ['manage_users', 'view_analytics'],
      verificationFileUrl: 'https://example.com/file.pdf',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  await usersColl.insertMany(fakeUsers);
  console.log("Users seeded.");

  // Jobs
  const jobsColl = db.collection('jobs');
  const fakeJobs = [];
  for(let i=0; i<10; i++) {
    fakeJobs.push({
      title: `Software Engineer ${i}`,
      company: `Tech Corp ${i}`,
      location: `Lagos ${i}`,
      description: 'Test description',
      requirements: ['BSc', '3 years exp'],
      type: 'FULL_TIME',
      workplace: 'REMOTE',
      salaryRange: '₦300k - ₦500k',
      applyLink: 'https://example.com',
      deadline: new Date(Date.now() + 86400000 * 14),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  await jobsColl.insertMany(fakeJobs);
  console.log("Jobs seeded.");

  // Subscriptions
  const subsColl = db.collection('subscriptions');
  const sub = {
    name: 'Pro Plan',
    description: 'All features',
    price: 500000,
    durationMonths: 1,
    features: ['A', 'B'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const subRes = await subsColl.insertOne(sub);
  
  // Payments
  const payColl = db.collection('payments');
  const fakePayments = [];
  for(let i=0; i<15; i++) {
    fakePayments.push({
      userId: fakeUsers[0]._id, // Note: not real ObjectIds but good enough
      subscriptionId: subRes.insertedId,
      amount: 500000,
      reference: `REF_${Date.now()}_${i}`,
      status: i % 4 === 0 ? 'FAILED' : 'SUCCESS',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  await payColl.insertMany(fakePayments);
  console.log("Payments & Subs seeded.");

  // Enquiries
  const enqColl = db.collection('enquiries');
  const fakeEnq = [];
  for(let i=0; i<8; i++) {
    fakeEnq.push({
      name: `Sender ${i}`,
      email: `sender${i}@example.com`,
      message: 'Hello world',
      status: i % 2 === 0 ? 'unread' : 'read',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  await enqColl.insertMany(fakeEnq);
  console.log("Enquiries seeded.");

  // Vault (Resources)
  const resColl = db.collection('resources');
  const fakeRes = [];
  for(let i=0; i<12; i++) {
    fakeRes.push({
      title: `Material ${i}`,
      description: 'Useful resource',
      category: 'Study Guide',
      type: 'PDF',
      fileUrl: 'https://example.com/file.pdf',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  await resColl.insertMany(fakeRes);
  console.log("Resources seeded.");

  client.close();
}

seed().catch(console.error);
