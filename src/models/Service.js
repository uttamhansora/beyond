const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: String,
    slug: String,
    title: String,
    description: String,
    audiences: [{
        type: Schema.Types.ObjectId,
        ref: "Audience"
    }],
    benefits: [{
        type: Schema.Types.ObjectId,
        ref: "Benefit"
    }],
    faqs: [{
        type: Schema.Types.ObjectId,
        ref: "Faq"
    }],
    offerings: [{
        type: Schema.Types.ObjectId,
        ref: "Offering"
    }],
    testimonials: [{
        type: Schema.Types.ObjectId,
        ref: "Testimonial"
    }],
    processes: [{
        type: Schema.Types.ObjectId,
        ref: "Process"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);