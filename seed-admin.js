const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); // backend uses bcrypt

async function main() {
  const uri = 'mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test'); // Wait, let's list databases to find the right one or check backend config.
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    const users = db.collection('users');
    
    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('Marquis@MLS2026!', saltRounds);

    const email = 'marquis@medlabconvo.com';
    const user = await users.findOne({ email });

    if (user) {
      console.log('User found! Updating password...');
      await users.updateOne({ _id: user._id }, { $set: { passwordHash } });
    } else {
      console.log('User not found! Creating...');
      await users.insertOne({
        email,
        firstName: 'Marquis',
        lastName: 'Admin',
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
