const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipDevelopmentComponent = new Schema({
    heading: String,
    title:String,
    description:String,
}, {timestamps: true});

module.exports = mongoose.model('LeadershipDevelopmentComponent', LeadershipDevelopmentComponent);