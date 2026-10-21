const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CaseStudy = new Schema({
    name: String,
    author:String,
    image:String,
    youtube_link:String,
    category_id:String,
    content:String,
    slug:String
}, {timestamps: true});

module.exports = mongoose.model('CaseStudy', CaseStudy);