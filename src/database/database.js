'use strict';

require('dotenv').config();

const Mongoose = require('mongoose');

// load database
Mongoose.connect(process.env.MONGO_URL,
    { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD });

const db = Mongoose.connection;

db.on('error', (err) => {

    throw err;
});
db.once('open', () => {

    console.log('Connection with database succeeded.' + process.env.MONGO_URL);
});

exports.db = db;
