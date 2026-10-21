const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompetenceBuildingDifferentiators = new Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('CompetenceBuildingDifferentiators', CompetenceBuildingDifferentiators);