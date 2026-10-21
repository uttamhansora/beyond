const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Testimonial = new Schema({
    name: String,
    image: {
        type:String,
        default: 'public/files/defaultuser.png', // Default image path
    },
    client_logo: String,
    position: String,
    format:String,
    youtube_link:String,
    description:String,
    category_id:String
}, {timestamps: true});

module.exports = mongoose.model('Testimonial', Testimonial);