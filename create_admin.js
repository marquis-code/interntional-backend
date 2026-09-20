const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Or bcrypt depending on what is installed
mongoose.connect('mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional');
mongoose.connection.on('open', async () => {
  const db = mongoose.connection.db;
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.collection('users').insertOne({
    email: 'admin@interntional.com',
    password: hashedPassword,
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  console.log('Admin user created: admin@interntional.com / admin123');
  process.exit(0);
});
