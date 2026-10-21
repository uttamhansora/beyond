const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipDevelopmentDifferentiators = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('LeadershipDevelopmentDifferentiators', LeadershipDevelopmentDifferentiators);