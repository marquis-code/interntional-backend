const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional');
mongoose.connection.on('open', async () => {
  const db = mongoose.connection.db;
  const admin = await db.collection('users').findOne({ role: 'SUPER_ADMIN' });
  console.log(admin ? `Admin found: ${admin.email}` : 'No admin found');
  process.exit(0);
});
