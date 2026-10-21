const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssesmentCenters = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    br_pdf:String,
    section_1_title:String,
    section_1_image:String,
    section_1_description:String,
    offreing_title:String,
    main_image:String,
    bg_image:String,

    offer_1_title:String,
    offer_1_heading:String,
    offer_1_image:String,
    offer_1_description:String,
    offer_1_download_file:String,

    offer_2_title:String,
    offer_2_heading:String,
    offer_2_image:String,
    offer_2_description:String,
    offer_2_download_file:String,

    offer_3_title:String,
    offer_3_heading:String,
    offer_3_image:String,
    offer_3_description:String,
    offer_3_download_file:String,

    application_title:String,

    quality_title:String,
    quaity_image:String,
    quality_description:String,

    deliverible_title:String,

    deliverables_1_title:String,
    deliverables_1_image:String,
    deliverables_1_description:String,

    deliverables_2_title:String,
    deliverables_2_image:String,
    deliverables_2_description:String,

    deliverables_3_title:String,
    deliverables_3_image:String,
    deliverables_3_description:String,

    benchmark_title:String,

    development_center_title:String,
    development_center_heading:String,
    assenment_heading_title:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }


}, {timestamps: true});

module.exports = mongoose.model('AssesmentCenters', AssesmentCenters);