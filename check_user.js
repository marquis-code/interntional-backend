const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abahmarquis_db_user:5HVCaoXQ92Kjcq9c@intentional.lvyfogc.mongodb.net/?appName=intentional');

const schema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', schema, 'users');

async function run() {
  const user = await User.findOne({ email: 'abahmarquis@gmail.com' });
  console.log(user);
  process.exit(0);
}
run();
