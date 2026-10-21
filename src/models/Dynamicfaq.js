const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Dynamicfaq = new Schema({
    faq_name:String,
    faq_description:String,
}, {timestamps: true});

module.exports = mongoose.model('Dynamicfaq', Dynamicfaq);