const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Download = new Schema({
    title:String,
    description:String,
    image:String,
    download_file:String,
    video_link:String,
     order: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model('Download', Download);