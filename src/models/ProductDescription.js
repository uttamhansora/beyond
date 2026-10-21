const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductDescription = new Schema({
    name: {
        type: String
    },
    description:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('ProductDescription', ProductDescription);