const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DevelopmentCenterComponents = new Schema({
    heading: String,
    title: String,
    description:String
}, {timestamps: true});

module.exports = mongoose.model('DevelopmentCenterComponents', DevelopmentCenterComponents);