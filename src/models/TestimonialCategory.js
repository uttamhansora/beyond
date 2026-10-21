const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestimonialCategory = new Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('TestimonialCategory', TestimonialCategory);