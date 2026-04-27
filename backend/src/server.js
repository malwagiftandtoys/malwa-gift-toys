const mongoose = require('mongoose');
const app      = require('./app');
require('dotenv').config();

const PORT       = process.env.PORT || 5000;
const MONGO_URI  = process.env.MONGODB_URI || 'mongodb://localhost:27017/malwagifts';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Malwa Gift & Toys Server running on port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}/api`);
    console.log(`🏪 Store: malwagiftandtoys.in`);
  });
})
.catch(err => {
  console.error('❌ DB Connection Failed:', err.message);
  process.exit(1);
});
