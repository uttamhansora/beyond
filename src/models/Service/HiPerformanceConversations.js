const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HiPerformanceConversations = new Schema({
    name: String,
    main_title: String,
    description:String,
    main_image:String,
    slug:String,
bg_image:String,
br_pdf:String,
    productivity_1_title:String,
    productivity_1_percentage:String,
    productivity_1_descriptiion:String,

    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    productivity_2_title:String,
    productivity_2_percentage:String,
    productivity_2_descriptiion:String,

    advantage_title:String,

    advantage_image_1:String,
    advantage_title_1:String,
    advantage_description_1:String,

    advantage_image_2:String,
    advantage_title_2:String,
    advantage_description_2:String,

    advantage_image_3:String,
    advantage_title_3:String,
    advantage_description_3:String,

    advantage_image_4:String,
    advantage_title_4:String,
    advantage_description_4:String,

    variant_title:String,

    variant_title_1:String,
    variant_use_for_1:String,
    variant_price_1:String,
    variant_partipant_title_1:String,
    variant_description_1:String,

    variant_title_2:String,
    variant_use_for_2:String,
    variant_price_2:String,
    variant_partipant_title_2:String,
    variant_description_2:String,

    variant_title_3:String,
    variant_use_for_3:String,
    variant_price_3:String,
    variant_partipant_title_3:String,
    variant_description_3:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }
}, {timestamps: true});

module.exports = mongoose.model('HiPerformanceConversations', HiPerformanceConversations);