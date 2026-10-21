const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CompetencyMapping = new Schema({
    name: String,
    main_title: String,
    main_image:String,
    section_1_title:String,
    slug:String,
    mapping_title:String,
    mapping_description:String,
    
    mapping_use_1:String,
    br_pdf:String,
    mapping_use_2:String,
    bg_image:String,
    mapping_use_3:String,
    mapping_use_4:String,
    methodology_title:String,
    methodology_description:String,
    diffrence_title:String,
    diffrence_image_1:String,
    diffrence_title_1:String,
    diffrence_image_2:String,
    diffrence_title_2:String,
    diffrence_image_3:String,
    diffrence_title_3:String,
    mapping_section_title:String,
    mapping_section_description:String,
    mapping_section_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    clients:{
        type:[String],
        ref:"Client"
    }
}, {timestamps: true});

module.exports = mongoose.model('CompetencyMapping', CompetencyMapping);