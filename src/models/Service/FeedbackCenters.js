const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackCenters = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    main_image:String,
    section_1_title:String,
    bg_image:String,
    section_1_image:String,
    section_1_description:String,
    offreing_title:String,
    
    most_title:String,
    most_description:String,

    offer_1_title:String,
    offer_1_heading:String,
    offer_1_image:String,
    offer_1_description:String,
    // offer_1_download_file:String,

    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    offer_2_title:String,
    offer_2_heading:String,
    offer_2_image:String,
    offer_2_description:String,
    // offer_2_download_file:String,

    offer_3_title:String,
    offer_3_heading:String,
    offer_3_image:String,
    offer_3_description:String,
    // offer_3_download_file:String,

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
    testimonials:{
        type:[String],
        ref:"Testimonial"
    },
    cta_demo_title_1:String,
    cta_demo_description_1:String,
    cta_button_name_1:String,
    cta_button_link_1:String,
    
    cta_deliverable_title_1:String,
    cta_deliverable_description_1:String,
    cta_deliverable_button_name_1:String,
    cta_deliverable_button_link_1:String,
    
    cta_launch_title_1:String,
    cta_launch_button_name_1:String,
    cta_launch_button_link_1:String,
    

}, {timestamps: true});

module.exports = mongoose.model('FeedbackCenters', FeedbackCenters);