const mongoose = require('mongoose');

const LDevelopmentCenterSchema = new mongoose.Schema({
    heading: String,
    title: String,
    image_title: String,
    image: String,
    title2: String,
}, { timestamps: true, collection: 'LDevelopmentCenter' });

module.exports = mongoose.model('LDevelopmentCenter', LDevelopmentCenterSchema);
