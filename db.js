'use strict';
const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://supagrownew:NGFfmQjfkpwyliNn@supagrow-new.yuhrg.mongodb.net/beyondbackend';

function connectMongo() {
    mongoose.connect(mongoUri, {}).then(() => {
        console.log('Connected to Mongodb........');
    }).catch((error) => {
        console.error('MongoDB connection failed, retrying...', error.code || error.name);
        setTimeout(connectMongo, 5000);
    });
}

connectMongo();


