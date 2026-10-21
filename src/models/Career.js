const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Career = new Schema({
    job_title: String,
    job_designation: String,
    description:String,
    company_name:String,
}, {timestamps: true});

module.exports = mongoose.model('Career', Career);