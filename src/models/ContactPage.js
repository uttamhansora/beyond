const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactPage = new Schema({
    convertion_title:String,
    address_title:String,
    address:String,
    contact:String,
    board:String,
    email:String,
    
    description:String,
    youtube_link:String,
    linkedin_link:String,
}, {timestamps: true});

module.exports = mongoose.model('ContactPage', ContactPage);