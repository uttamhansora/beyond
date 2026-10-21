const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CaseCategory = new Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('CaseCategory', CaseCategory);