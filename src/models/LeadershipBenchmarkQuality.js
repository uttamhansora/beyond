const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipBenchmarkQuality = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('LeadershipBenchmarkQuality', LeadershipBenchmarkQuality);