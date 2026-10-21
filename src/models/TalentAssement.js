const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TalentAssement = new Schema({
    title: String,
    heading: String,
    image:String,
    description:String,
    download_file:String,
}, {timestamps: true});

module.exports = mongoose.model('TalentAssement', TalentAssement);