const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogCategory = new Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('BlogCategory', BlogCategory);