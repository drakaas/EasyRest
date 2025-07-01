const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:secret@mongodb:27017/mydatabase?authSource=admin', {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:secret@localhost:27017/mydatabase?authSource=admin', {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000 // 45 seconds socket timeout
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;