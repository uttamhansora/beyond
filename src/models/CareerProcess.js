const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CareerProcess = new Schema({
    title:String,
    description:String
}, {timestamps: true});

module.exports = mongoose.model('CareerProcess', CareerProcess);