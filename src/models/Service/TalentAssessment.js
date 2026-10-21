const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const TalentAssessment = new Schema({
    name: String,
    main_title: String,
    description:String,
    main_image:String,
    br_pdf:String,
    slug:String,
    bg_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    developmentcenter_title:String,
    section_1_title:String,
    section_1_heading:String,
    section_1_image:String,
    section_1_description:String,

    application_title:String,
    section_2_title:String,
    section_2_image:String,
    section_2_description:String,
    deliverable_title:String,

    deliverable_title_1:String,
    deliverable_image_1:String,
    deliverable_description_1:String,

    deliverable_title_2:String,
    deliverable_image_2:String,
    deliverable_description_2:String,

    deliverable_title_3:String,
    deliverable_image_3:String,
    deliverable_description_3:String,


    benchmark_title:String,

    development_center_title:String,
    development_center_heading:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }

}, {timestamps: true});

module.exports = mongoose.model('TalentAssessment', TalentAssessment);