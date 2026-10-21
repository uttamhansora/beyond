const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Benchmark = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('Benchmark', Benchmark);