const mongoose = require('mongoose');

const Ticket = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    date: Date,
    active: Boolean
});

module.exports = mongoose.model('tickets', Ticket);