const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Audience = new Schema({
    name: String,
    image: String,
    description_1:String,
}, {timestamps: true});

module.exports = mongoose.model('Audience', Audience);