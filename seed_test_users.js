require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const db = mongoose.connection;
  
  // 1. Fetch Subscription Plans
  const plans = await db.collection('subscriptions').find({}).toArray();
  if (plans.length === 0) {
    console.log("No subscription plans found in DB.");
    process.exit(1);
  }
  
  console.log(`Found ${plans.length} subscription plans.`);
  
  // 2. Create users for each plan
  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    const planName = plan.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `test_${planName}@convo.com`;
    const password = 'Password123!';
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Check if user exists
    let user = await db.collection('users').findOne({ email });
    if (!user) {
      const res = await db.collection('users').insertOne({
        firstName: 'Test',
        lastName: plan.name,
        email: email,
        passwordHash: passwordHash,
        status: 'APPROVED',
        role: 'INTERN_MEMBER',
        department: 'GENERAL',
        activeSubscription: plan._id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      user = { _id: res.insertedId };
      console.log(`Created user: ${email} with password: ${password}`);
    } else {
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { passwordHash: passwordHash, activeSubscription: plan._id, status: 'APPROVED' } }
      );
      console.log(`Updated user: ${email} with password: ${password}`);
    }
  }
  
  console.log('Done.');
  process.exit(0);
}

seed().catch(console.error);
