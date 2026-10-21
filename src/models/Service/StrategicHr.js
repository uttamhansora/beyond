const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StrategicHr = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    main_image:String,
    bg_image:String,
    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    clients:{
        type:[String],
        ref:"Client"
    }
}, {timestamps: true});

module.exports = mongoose.model('StrategicHr', StrategicHr);