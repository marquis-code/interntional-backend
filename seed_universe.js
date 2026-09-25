const mongoose = require('mongoose');

// Define schemas on the fly for seeding
const UniversitySchema = new mongoose.Schema({
  name: String,
  location: String,
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

const ProgrammeSchema = new mongoose.Schema({
  name: String,
  department: String,
  universityId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  universityId: mongoose.Schema.Types.ObjectId,
  programmeId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'enrolled' },
  createdAt: { type: Date, default: Date.now },
});

async function seed() {
require('dotenv').config();
  await mongoose.connect(process.env.MONGODB_URI);
  
  console.log('Connected to MongoDB');

  const University = mongoose.model('University', UniversitySchema);
  const Programme = mongoose.model('Programme', ProgrammeSchema);
  const Student = mongoose.model('Student', StudentSchema);

  // Clear existing
  await University.deleteMany({});
  await Programme.deleteMany({});
  await Student.deleteMany({});

  console.log('Cleared existing universe collections');

  // Seed Universities
  const universities = await University.insertMany([
    { name: 'University of Lagos', location: 'Lagos, Nigeria' },
    { name: 'Covenant University', location: 'Ota, Nigeria' },
    { name: 'University of Ibadan', location: 'Ibadan, Nigeria' }
  ]);

  console.log('Seeded Universities');

  // Seed Programmes
  const programmes = await Programme.insertMany([
    { name: 'Computer Science', department: 'Faculty of Science', universityId: universities[0]._id },
    { name: 'Software Engineering', department: 'Faculty of Engineering', universityId: universities[1]._id },
    { name: 'Information Technology', department: 'Faculty of Technology', universityId: universities[2]._id }
  ]);

  console.log('Seeded Programmes');

  // Seed Students
  const students = await Student.insertMany([
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', universityId: universities[0]._id, programmeId: programmes[0]._id, status: 'enrolled' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', universityId: universities[1]._id, programmeId: programmes[1]._id, status: 'enrolled' },
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', universityId: universities[2]._id, programmeId: programmes[2]._id, status: 'enrolled' },
    { firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com', universityId: universities[0]._id, programmeId: programmes[0]._id, status: 'graduated' },
    { firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', universityId: universities[1]._id, programmeId: programmes[1]._id, status: 'suspended' },
  ]);

  console.log('Seeded Students');

  console.log('Seeding Complete');
  process.exit(0);
}

seed().catch(console.error);
