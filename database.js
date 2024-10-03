const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://joakim:admin@cluster.jzzsv.mongodb.net/ticket-system?retryWrites=true&w=majority&appName=Cluster");
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = connectDB;
