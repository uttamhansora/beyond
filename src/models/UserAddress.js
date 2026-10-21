const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAddress = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: String
    },
    address_1: {
        type: String,
    },
    address_2: {
        type: String,
        default:""
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    state:{
        type:String,
        default:""
    },
    zip:{
        type:String,
        default:"",
    },
    user_id:{
        type:String,
        ref:"User",
    },
    isDefault: { type: Boolean, enum: [true, false], default: false },
}, {timestamps: true});

module.exports = mongoose.model('UserAddress', UserAddress);