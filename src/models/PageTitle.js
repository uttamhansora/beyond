const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PageTitle = new Schema({
    team_page_title:String,
    team_page_description:String,

    download_page_title:String,
    download_page_description:String,
    download_page_section_title:String,

    testimonial_page_title:String,
    testimonial_page_description:String,
    
    client_page_title:String,
    client_page_description:String,
    client_main_title:String,
    about_image:String,
    team_image:String,
    downloads_image:String,
    testimonials_image:String,
    clients_image:String,
    careers_image:String,
    casestudy_image:String,

   
}, {timestamps: true});

module.exports = mongoose.model('PageTitle', PageTitle);