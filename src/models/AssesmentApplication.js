const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssesmentApplication = new Schema({
    name: String
}, {timestamps: true});

module.exports = mongoose.model('AssesmentApplication', AssesmentApplication);