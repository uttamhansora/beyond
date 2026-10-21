const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MostFeedback = new Schema({
    title: String,
    description: String,
    heading:String,
}, {timestamps: true});

module.exports = mongoose.model('MostFeedback', MostFeedback);