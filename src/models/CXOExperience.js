const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CXOExperience = new Schema({
    heading: {
        type: String
    },
    title:String,
    description:String,
}, {timestamps: true});

module.exports = mongoose.model('CXOExperience', CXOExperience);