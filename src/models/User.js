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
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        default:""
    },
    password: {
        type: String,
        required: true,
        select: false,
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
       default:"",
       select: false,
    }
}, { timestamps: true, autoIndex: false });

User.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.otp;
    return obj;
};

module.exports = mongoose.model('User', User);