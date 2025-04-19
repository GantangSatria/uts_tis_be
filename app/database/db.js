const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ticketdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ Connection error:'));
db.once('open', () => {
  console.log('✅ MongoDB connected');
});

module.exports = db;
