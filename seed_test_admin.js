require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  
  const email = 'test_moderator@medlabconvo.com';
  const password = 'Password123!';
  const passwordHash = await bcrypt.hash(password, 10);
  
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    await db.collection('users').updateOne(
      { _id: existingUser._id },
      { $set: { 
          passwordHash,
          role: 'MODERATOR', 
          status: 'APPROVED',
          permissions: ['manage_jobs', 'view_analytics'] // Only 2 permissions
        } 
      }
    );
    console.log(`Updated test admin: ${email}`);
  } else {
    await db.collection('users').insertOne({
      firstName: 'Test',
      lastName: 'Moderator',
      email: email,
      passwordHash: passwordHash,
      status: 'APPROVED',
      role: 'MODERATOR',
      permissions: ['manage_jobs', 'view_analytics'], // Only 2 permissions
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`Created test admin: ${email}`);
  }
  
  process.exit(0);
}

seedAdmin().catch(console.error);
