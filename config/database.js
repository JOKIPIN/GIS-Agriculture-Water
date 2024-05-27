const mongoose = require('mongoose');

// Ini db nya pake mongodb (install dulu app mongodb mu di wweb mongo db ke com/laptop)
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/geo-info-system');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
