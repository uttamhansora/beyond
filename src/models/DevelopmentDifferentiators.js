const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DevelopmentDifferentiators = new Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('DevelopmentDifferentiators', DevelopmentDifferentiators);