const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompetenceBuildingFaq = new Schema({
    faq_name: String,
    faq_description: String
}, {timestamps: true});

module.exports = mongoose.model('CompetenceBuildingFaq', CompetenceBuildingFaq);