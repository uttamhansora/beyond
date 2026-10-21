const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    value:{
        type:String
    },
    image:{
        type:String,
    },
    price:{
        type:String
    },
    stock:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('ProductAttribute', attributeSchema);