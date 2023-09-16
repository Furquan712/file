require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        // Database connection 🥳
        await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected 🥳🥳🥳🥳');
    } catch (error) {
        console.error('Connection failed ☹️☹️☹️☹️', error);
    }
}

module.exports = connectDB;
