const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Restructuring = new Schema({
    name: String,
    main_image:String,
    main_title: String,
    bg_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    description:String,
    slug:String,
    ns_title:String,
    ns_image:String,
    ns_description:String,
    clients:{
        type:[String],
        ref:"Client"
    },
}, {timestamps: true});

module.exports = mongoose.model('Restructuring', Restructuring);