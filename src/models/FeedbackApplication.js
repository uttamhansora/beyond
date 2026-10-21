const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackApplication = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('FeedbackApplication', FeedbackApplication);