require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const UserSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', UserSchema, 'users');

async function run() {
  const bcrypt = require('bcrypt');
  const password = await bcrypt.hash('password123', 10);
  
  await User.updateOne(
    { email: 'abahkauzy3@gmail.com' },
    { 
      $set: { 
        email: 'abahkauzy3@gmail.com',
        firstName: 'Test',
        lastName: 'Intern',
        password,
        role: 'user',
        platform: 'international',
        subscriptionPlan: 'PRO',
        subscriptionStatus: 'active'
      }
    },
    { upsert: true }
  );

  await User.updateOne(
    { email: 'ajayiatilola03@gmail.com' },
    { 
      $set: { 
        email: 'ajayiatilola03@gmail.com',
        firstName: 'Test',
        lastName: 'Univ',
        password,
        role: 'user',
        platform: 'universe',
        subscriptionPlan: 'PRO',
        subscriptionStatus: 'active'
      }
    },
    { upsert: true }
  );

  console.log("Users created with password: password123");
  process.exit(0);
}
run();
