const mongoose = require('mongoose');

const LDevelopmentCenterSchema = new mongoose.Schema({
    heading: String,
    title: String,
    image: String,
    title2: String,
}, { timestamps: true, collection: 'FDevelopmentCenter' });

module.exports = mongoose.model('FDevelopmentCenter', LDevelopmentCenterSchema);
