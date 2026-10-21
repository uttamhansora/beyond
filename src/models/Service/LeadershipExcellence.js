const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadershipExcellence = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    bg_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    development_title:String,
    edge_title:String,
    main_image:String,
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

module.exports = mongoose.model('LeadershipExcellence', LeadershipExcellence);