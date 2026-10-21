const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MainService = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    title_1:String,
    image_1:String,
    title_2:String,
    image_2:String,
    bg_image:String,
}, {timestamps: true});

module.exports = mongoose.model('MainService', MainService);