const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dealerpersonnelexcellence = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    main_image:String,
    icon_title:String,
    icon_1_title:String,
    icon_1_image:String,
    bg_image:String,
    br_pdf:String,
    icon_1_description:String,
    icon_2_title:String,
    icon_2_image:String,
    icon_2_description:String,
    icon_3_title:String,
    icon_3_image:String,
    icon_3_description:String,

    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    icon_4_title:String,
    icon_4_image:String,
    icon_4_description:String,
    overview_title:String,
    overview_image:String,
    overview_description:String,
    component_title:String,
    component_description:String,
    component_1_title:String,
    component_1_image:String,
    component_1_description:String,
    component_2_title:String,
    component_2_image:String,
    component_2_description:String,
    component_3_title:String,
    component_3_image:String,
    component_3_description:String,
    component_4_title:String,
    component_4_image:String,
    component_4_description:String,
    feedback_title:String,
    overall_title:String,
    sales_personal_title:String,
    service_personal_title:String,
    overall_best_program_title:String,
    overall_best_program_percentage:Number,
    overall_outstanding_title:String,
    overall_outstanding_percentage:Number,
    overall_very_good_title:String,
    overall_very_good_percentage:Number,
    overall_good_title:String,
    overall_good_percentage:Number,
    sales_best_program_title:String,
    sales_best_program_percentage:Number,
    sales_outstanding_title:String,
    sales_outstanding_percentage:Number,
    sales_very_good_title:String,
    sales_very_good_percentage:Number,
    sales_good_title:String,
    sales_good_percentage:Number,
    service_best_program_title:String,
    service_best_program_percentage:Number,
    service_outstanding_title:String,
    service_outstanding_percentage:Number,
    service_good_title:String,
    service_good_percentage:Number,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }

}, {timestamps: true});

module.exports = mongoose.model('dealerpersonnelexcellence', dealerpersonnelexcellence);