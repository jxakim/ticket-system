const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    hashed_password: String,
    temp_password: String,
});

module.exports = mongoose.model('users', User);