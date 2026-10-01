const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional";
async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('test'); // Or whatever the DB name is, might just be default
  const user = await db.collection('users').findOne({ email: 'marquis@medlabconvo.com' });
  console.log(user ? { email: user.email, role: user.role, permissions: user.permissions } : 'Not found');
  await client.close();
}
run();
