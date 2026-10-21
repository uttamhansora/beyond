const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FutureLeaders = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    serviceType:String,
    serviceName:String,
    main_image:String,
    section_1_description:String,
    section_1_image:String,
    bg_image:String,
    identify_title:String,
    identify_description:String,

    identify_1_image:String,
    identify_1_title:String,

    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    identify_2_image:String,
    identify_2_title:String,

    identify_3_image:String,
    identify_3_title:String,

    process_title:String,
    process_description:String,

    edge_title:String,
    clients:{
        type:[String],
        ref:"Client"
    }

}, {timestamps: true});

module.exports = mongoose.model('FutureLeaders', FutureLeaders);