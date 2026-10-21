const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Careerform = new Schema({
    f_name: {
        type: String
    },
    l_name: {
        type: String
    },
    number: {
        type: String
    },
    email:{
        type:String
    },
    why_join:{
        type:String
    },
    cv:{
        type:String
    },
    career_id:{
        type:String
    },
}, {timestamps: true});

module.exports = mongoose.model('Careerform', Careerform);