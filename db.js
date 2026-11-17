'use strict';
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

function connectMongo() {
    if (!mongoUri) {
        console.error('MONGODB_URI is not set.');
        process.exit(1);
    }

    mongoose.connect(mongoUri, {}).then(() => {
        console.log('Connected to Mongodb........');
    }).catch((error) => {
        console.error('MongoDB connection failed, retrying...', error.code || error.name);
        setTimeout(connectMongo, 5000);
    });
}

connectMongo();
