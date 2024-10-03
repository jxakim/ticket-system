const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  date: Date
}, { collection: 'tickets' });

// Export the model
module.exports = mongoose.model('Ticket', ticketSchema);
