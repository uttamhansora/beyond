const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CompetencyBasedInterviewing = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    main_image:String,
    sec_1_percentage:String,
    sec_1_description:String,
    sec_2_percentage:String,
    br_pdf:String,
    sec_2_description:String,
    interview_title:String,
    bg_image:String,
    interview_description:String,
    interview_1_title:String,
    interview_2_title:String,
    interview_3_title:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    interview_1_description:String,
    interview_2_description:String,
    interview_3_description:String,
    edge_title:String,

    edge_1_title:String,
    edge_1_image:String,

    edge_2_title:String,
    edge_2_image:String,

    edge_3_title:String,
    edge_3_image:String,

    edge_4_title:String,
    edge_4_image:String,

    profiency_section_title:String,
    profiency_description:String,
    profiency_image:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    }
}, {timestamps: true});

module.exports = mongoose.model('CompetencyBasedInterviewing', CompetencyBasedInterviewing);