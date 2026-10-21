const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CareerCompetencies = new Schema({
    title:String,
    description:String
}, {timestamps: true});

module.exports = mongoose.model('CareerCompetencies', CareerCompetencies);