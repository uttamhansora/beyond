const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DevelopmentCenters = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    section_1_image:String,
    section_1_title:String,
    main_image:String,
    br_pdf:String,
    section_1_description:String,
    section_2_image:String,
    section_2_title:String,
    section_2_description:String,
    bg_image:String,
    component_title:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    component_description:String,
    differentiators_title:String,
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

module.exports = mongoose.model('DevelopmentCenters', DevelopmentCenters);