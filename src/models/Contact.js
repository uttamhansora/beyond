const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Contact = new Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    country: { type: String, trim: true },
    privacyAccepted: { type: Boolean, default: false },
    name: {
        type: String
    },
    email:{
        type:String
    },
    category:{
        type:String
    },
    phone:{
        type:String
    },
    company:{
        type:String
    },
    message: { type: String, trim: true },
}, {timestamps: true});

module.exports = mongoose.model('Contact', Contact);
