const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipBenchmarkApplications = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('LeadershipBenchmarkApplications', LeadershipBenchmarkApplications);