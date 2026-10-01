import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String },
  status: { type: String },
  verificationFileUrl: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/convo-commerce';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const admins = [
    {
      email: 'interntional@medlabconvo.com',
      password: 'Admin@MLS2026!',
      firstName: 'InternTional',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      adminPlatform: 'interntional',
    },
    {
      email: 'universe@medlabconvo.com',
      password: 'Univ@MLS2026!',
      firstName: 'UniVerse',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      adminPlatform: 'universe',
    },
    {
      email: 'marquis@medlabconvo.com',
      password: 'Marquis@MLS2026!',
      firstName: 'Marquis',
      lastName: 'SuperAdmin',
      role: 'SUPER_ADMIN',
      adminPlatform: 'both',
    }
  ];

  for (const admin of admins) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(admin.password, salt);

    await User.findOneAndUpdate(
      { email: admin.email },
      {
        $set: {
          email: admin.email,
          passwordHash,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          status: 'APPROVED',
          verificationFileUrl: 'https://example.com/admin.pdf',
          adminPlatform: admin.adminPlatform,
        }
      },
      { upsert: true, new: true }
    );
    console.log(`Upserted ${admin.email}`);
  }

  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch(console.error);
