const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        default:""
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
          values: ['admin','user'],
          message: "{VALUE} role is not supported!",
        }, 
        default:'user'
    },
    otp:{
        type:String,
       default:""
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User);