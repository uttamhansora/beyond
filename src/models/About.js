const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type:String,
    }
});


const About = new Schema({
    sec_1_title: {
        type: String
    },
    mission_title:{
        type:String
    },
    br_pdf:String,
    
    mission_description:{
        type:String
    },
    vision_title:{
        type:String
    },
    vision_description:{
        type:String
    },
    core_values:{
        type:[String]
    },
    principles:{
        type:[attributeSchema]
    },
    sec_2_title: {
        type: String
    },
    sec_2_description: {
        type: String
    },
    about_page_title:String,
    practice_area_title:String,
    practice_area_description:String,
    practice_section_1_title:String,
    practice_section_1_image:String,
    practice_section_1_description:String,

    practice_section_2_title:String,
    practice_section_2_image:String,
    practice_section_2_description:String,

    practice_section_3_title:String,
    practice_section_3_image:String,
    practice_section_3_description:String,

    principle_title:String,
    principle_description:String,
}, {timestamps: true});

module.exports = mongoose.model('About', About);