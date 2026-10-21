const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServicePage = new Schema({
    consultant_title:String,
    consultant_description:String,
    competencies_title:String,
    competencies_description:String,
    process_title:String,
    process_description:String,
     career_page_title:String,
    career_page_description:String,
    career_page_section_title:String,
    
    application_title:String,
    application_description:String,
}, {timestamps: true});

module.exports = mongoose.model('ServicePage', ServicePage);