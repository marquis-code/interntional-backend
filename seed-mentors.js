const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    // We assume the DB name is the default one provided by the connection string or 'test'
    // Let's grab the default DB.
    const db = client.db();
    
    const mentorsCollection = db.collection('mentors');
    const categoriesCollection = db.collection('mentorcategories');

    // Seed mentor categories first
    const categories = [
      { name: 'Research & Development', description: 'Guidance on R&D careers', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Clinical Diagnostics', description: 'Clinical laboratory operations', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biomedical Engineering', description: 'Equipment and systems', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Public Health', description: 'Epidemiology and public health', isActive: true, createdAt: new Date(), updatedAt: new Date() }
    ];

    await categoriesCollection.deleteMany({});
    await categoriesCollection.insertMany(categories);
    console.log("Inserted mentor categories!");

    const mentors = [
      {
        name: 'Dr. Jane Doe',
        email: 'jane.doe@medlabconvo.com',
        avatar: 'https://i.pravatar.cc/150?u=jane.doe@medlabconvo.com',
        bio: 'Over 15 years of experience in Clinical Diagnostics and laboratory management.',
        areaOfInterest: 'Clinical Diagnostics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Prof. Alan Smith',
        email: 'alan.smith@medlabconvo.com',
        avatar: 'https://i.pravatar.cc/150?u=alan.smith@medlabconvo.com',
        bio: 'Leading researcher in Biomedical Engineering with multiple patents.',
        areaOfInterest: 'Biomedical Engineering',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Connor',
        email: 'sarah.connor@medlabconvo.com',
        avatar: 'https://i.pravatar.cc/150?u=sarah.connor@medlabconvo.com',
        bio: 'Specialist in Public Health focusing on tropical diseases.',
        areaOfInterest: 'Public Health',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. John Watson',
        email: 'john.watson@medlabconvo.com',
        avatar: 'https://i.pravatar.cc/150?u=john.watson@medlabconvo.com',
        bio: 'Pioneering new approaches in medical research and drug development.',
        areaOfInterest: 'Research & Development',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Chen',
        email: 'emily.chen@medlabconvo.com',
        avatar: 'https://i.pravatar.cc/150?u=emily.chen@medlabconvo.com',
        bio: 'Expert in clinical trials and diagnostic assay validation.',
        areaOfInterest: 'Clinical Diagnostics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await mentorsCollection.deleteMany({});
    await mentorsCollection.insertMany(mentors);
    
    console.log("Inserted mentors!");

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
