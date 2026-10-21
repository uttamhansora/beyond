const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HRExcellence = new Schema({
    name: String,
    main_title: String,
    slug:String,
    description:String,
    main_image:String,
    section_1_title:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    section_1_description:String,
    section_1_image:String,
    colleage_title:String,
    colleage_description:String,
    report_title:String,
    report_heading:String,
    bg_image:String,
    report_description:String,
    clients:{
        type:[String],
        ref:"Client"
    },
}, {timestamps: true});

module.exports = mongoose.model('HRExcellence', HRExcellence);