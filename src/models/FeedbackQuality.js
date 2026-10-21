const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackQuality = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('FeedbackQuality', FeedbackQuality);