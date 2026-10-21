const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Application = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('Application', Application);