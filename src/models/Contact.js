const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Contact = new Schema({
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
    message:String,
}, {timestamps: true});

module.exports = mongoose.model('Contact', Contact);