const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Client = new Schema({
    image:String,
    name:String,
    order: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model('Client', Client);