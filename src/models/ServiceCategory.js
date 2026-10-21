const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceCategory = new Schema({
    name:String,
    image: {
        type:String
    },
    pdf: String
}, {timestamps: true});

module.exports = mongoose.model('ServiceCategory', ServiceCategory);