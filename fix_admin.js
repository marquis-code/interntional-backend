const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional');
mongoose.connection.on('open', async () => {
  const db = mongoose.connection.db;
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await db.collection('users').updateOne(
    { email: 'admin@interntional.com' },
    { 
      $set: { 
        passwordHash: hashedPassword,
        status: 'APPROVED'
      },
      $unset: { password: "" }
    },
    { upsert: true }
  );
  
  console.log('Admin user FIXED: password mapped to passwordHash and status mapped to APPROVED.');
  process.exit(0);
});
