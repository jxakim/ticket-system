const mongoose = require('mongoose');

const Ticket = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    date: Date,
    active: Boolean,
    createdBy: String,
    lastUpdated: Date,
    lastUpdatedBy: String
});

module.exports = mongoose.model('tickets', Ticket);