const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Blog = new Schema({
    name: String,
    author:String,
    image:String,
    youtube_link:String,
    content:String,
    slug:String,
    category_id:String,
     date: {
        type: Date,
        default: Date.now
    },
    short_des:String,
    is_latest: { type: Boolean, default: false },
    is_home_latest: { type: Boolean, default: false }
}, {timestamps: true});

module.exports = mongoose.model('Blog', Blog);