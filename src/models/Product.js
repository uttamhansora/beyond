const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new mongoose.Schema({
    attr_name: {
        type: String
    },
    attr_id:{
        type:[String],
        ref: "ProductAttribute"
    }
});

const Product = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String,
    },
    category_id: {
        type: String,
        ref:"Category"
    },
    image:{
        type:String
    },
    sub_description:{
        type:String
    },
    description:{
        type:[String],
        ref: "ProductDescription"
    },
    price:{
        type:String
    },
    attribute:{
        type:[attributeSchema]
    },
    related_products:{
        type:[String]
    },
    status: {
        type: String,
        enum: {
          values: ['active','inactive'],
          message: "{VALUE} status is not supported!",
        }, 
        default:'active'
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', Product);