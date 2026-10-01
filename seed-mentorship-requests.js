const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const mentorshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  areaOfInterest: { type: String, required: true },
  application: { type: String, required: true, enum: ['universe', 'interntional'] },
  status: { type: String, default: 'pending', enum: ['pending', 'matched', 'completed', 'cancelled'] },
  notes: { type: String }
}, { timestamps: true });

const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

const sampleRequests = [
  {
    name: "John Student",
    email: "john.student@example.com",
    areaOfInterest: "Clinical Diagnostics",
    application: "interntional",
    status: "pending",
  },
  {
    name: "Alice Researcher",
    email: "alice.researcher@example.com",
    areaOfInterest: "Biomedical Engineering",
    application: "interntional",
    status: "pending",
  },
  {
    name: "Bob Med",
    email: "bob.med@example.com",
    areaOfInterest: "Public Health",
    application: "universe",
    status: "pending",
  },
  {
    name: "Charlie Bio",
    email: "charlie.bio@example.com",
    areaOfInterest: "Research & Development",
    application: "universe",
    status: "matched",
    notes: "Matched with Dr. John Watson"
  },
  {
    name: "Dana Science",
    email: "dana.science@example.com",
    areaOfInterest: "Clinical Diagnostics",
    application: "interntional",
    status: "completed",
    notes: "Completed 6-month mentorship successfully"
  },
  {
    name: "Eve Health",
    email: "eve.health@example.com",
    areaOfInterest: "Data Science in Health",
    application: "interntional",
    status: "pending",
  },
  {
    name: "Frank Lab",
    email: "frank.lab@example.com",
    areaOfInterest: "Molecular Biology",
    application: "universe",
    status: "pending",
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');
    
    console.log('Clearing old sample requests...');
    await Mentorship.deleteMany({ email: { $regex: '@example.com' } });

    // Fetch real mentors from the Mentor collection
    const mentorsSchema = new mongoose.Schema({}, { strict: false });
    const Mentor = mongoose.model('Mentor', mentorsSchema);
    const availableMentors = await Mentor.find();

    const getRandomMentor = (areaOfInterest) => {
      const matches = availableMentors.filter(m => m.areaOfInterest === areaOfInterest);
      if (matches.length > 0) return matches[Math.floor(Math.random() * matches.length)]._id;
      if (availableMentors.length > 0) return availableMentors[Math.floor(Math.random() * availableMentors.length)]._id;
      return null;
    };

    // Assign real mentors to matched/completed requests
    for (let req of sampleRequests) {
      if (req.status === 'matched' || req.status === 'completed') {
        req.matchedMentor = getRandomMentor(req.areaOfInterest);
      }
    }

    console.log('Inserting new sample requests...');
    await Mentorship.insertMany(sampleRequests);
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding requests:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
