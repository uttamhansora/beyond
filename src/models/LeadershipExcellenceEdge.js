const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipExcellenceEdge = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('LeadershipExcellenceEdge', LeadershipExcellenceEdge);