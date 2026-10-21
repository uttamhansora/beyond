const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Hiperforg = new Schema({
    name: String,
    main_title: String,
    description:String,
    main_image:String,
    bg_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    slug:String,
    clients:{
        type:[String],
        ref:"Client"
    },
}, {timestamps: true});

module.exports = mongoose.model('Hiperforg', Hiperforg);