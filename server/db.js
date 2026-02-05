const mongoose = require("mongoose");
require('dotenv').config(); // Load the .env file

// Use the variable from .env
var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('MongoDB Connection Failed');
});

connection.on('connected', () => {
    console.log('MongoDB Connection Successful');
});

module.exports = mongoose;