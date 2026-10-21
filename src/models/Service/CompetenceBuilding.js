const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompetenceBuilding = new Schema({
    name: String,
    main_title: String,
    description:String,
    main_image:String,
    slug:String,
    section_1_title:String,
    section_1_description:String,
    section_1_image:String,
    section_2_title:String,
    section_2_description:String,
    section_2_image:String,
    component_title:String,
    component_description:String,
    diffrentor_title:String,
    bg_image:String,
    faq_title:String,
    clients:{
        type:[String],
        ref:"Client"
    },service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }
}, {timestamps: true});

module.exports = mongoose.model('CompetenceBuilding', CompetenceBuilding);