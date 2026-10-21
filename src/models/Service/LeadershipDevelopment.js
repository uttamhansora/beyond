const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipDevelopment = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    section_1_title:String,
    section_1_description:String,
    bg_image:String,
    section_1_image:String,
    section_2_title:String,
    main_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    section_2_image:String,
    section_2_description:String,
    components_title:String,
    components_description:String,
    diffrent_title:String,
    faq_title:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }
}, {timestamps: true});

module.exports = mongoose.model('LeadershipDevelopment', LeadershipDevelopment);