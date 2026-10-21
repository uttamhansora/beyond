const mongoose = require('mongoose');

const sDevelopmentCenterSchema = new mongoose.Schema({
    heading: String,
    title: String,
    image_title: String,
    image: String,
    title2: String,
    slug: { type: String, unique: true },
}, { timestamps: true, collection: 'SDevelopmentCenter' });

module.exports = mongoose.model('SDevelopmentCenter', sDevelopmentCenterSchema);
