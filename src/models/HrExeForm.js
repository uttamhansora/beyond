const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HrExeForm = new Schema({
    name: String,
    email: String,
    company:String
}, {timestamps: true});

module.exports = mongoose.model('HrExeForm', HrExeForm);