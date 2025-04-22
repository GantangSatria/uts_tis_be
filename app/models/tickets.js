const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: String,
  train: String,
  date: Date
});

module.exports = mongoose.model('Ticket', ticketSchema);