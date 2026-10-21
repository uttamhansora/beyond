const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Offering = new Schema({
    main_title: String,
    title_1: String,
    description_1:String,
    title_2: String,
    description_2:String,
}, {timestamps: true});

module.exports = mongoose.model('Offering', Offering);