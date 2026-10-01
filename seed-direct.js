const mongoose = require('mongoose');
const { Schema } = mongoose;

const MentorshipSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  areaOfInterest: { type: String, required: true },
  application: { type: String, required: true, enum: ['universe', 'interntional'] },
  status: { type: String, default: 'pending', enum: ['pending', 'matched', 'completed', 'cancelled'] },
  matchedMentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  notes: String
}, { timestamps: true });

const MentorSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  jobTitle: String,
  bio: String,
  specializations: [String],
  company: String,
  imageUrl: String
}, { timestamps: true });

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String
}, { strict: false });

const Mentorship = mongoose.model('Mentorship', MentorshipSchema, 'mentorships');
const Mentor = mongoose.model('Mentor', MentorSchema, 'mentors');
const User = mongoose.model('User', UserSchema, 'users');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  const mentor = new Mentor({
    firstName: 'Robert',
    lastName: 'DeBate',
    email: 'robert@example.com',
    jobTitle: 'Lab Director',
    bio: 'Twenty years managing teams and building quality systems in clinical labs.',
    specializations: ['Lab Management', 'Operations'],
    company: 'Clina Labs'
  });
  await mentor.save();
  console.log('Created Mentor');

  const emails = ['abahkauzy3@gmail.com', 'ajayiatilola03@gmail.com'];

  for (const email of emails) {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User ${email} not found`);
      continue;
    }

    const mentorship = new Mentorship({
      user: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      areaOfInterest: 'Lab Management',
      application: 'universe',
      status: 'matched',
      matchedMentor: mentor._id,
      notes: 'Auto matched'
    });
    await mentorship.save();

    const mentorship2 = new Mentorship({
      user: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      areaOfInterest: 'Clinical Chemistry',
      application: 'interntional',
      status: 'matched',
      matchedMentor: mentor._id,
      notes: 'Auto matched'
    });
    await mentorship2.save();
    console.log(`Seeded mentorships for ${email}`);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
