const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Benifit = new Schema({
    name: String,
    description: String,
    image:String,
}, {timestamps: true});

module.exports = mongoose.model('Benifit', Benifit);