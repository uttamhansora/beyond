
const Process = require('../models/Process');
const Audience = require('../models/Audience');
const Benifit = require('../models/Benifit');
const Offering = require('../models/Offering');
const Testimonial = require('../models/Testimonial');


async function process(req, res) {
    try {
        // Fetch processes from the database (example)
        const processes = await Process.find();
        res.json(processes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function processCreate(req, res) {
    try {
        req.body.image=req.file.path ?? '';
        // Create a new process based on request body (example)
        const newProcess = await Process.create(req.body);
        res.status(201).json(newProcess);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function faq(req, res) {
    try {
        // Fetch FAQs from the database (example)
        const faqs = await Faq.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function faqCreate(req, res) {
    try {
        // Create a new FAQ based on request body (example)
        const newFaq = await Faq.create(req.body);
        res.status(201).json(newFaq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function audience(req, res) {
    try {
        // Fetch audiences from the database (example)
        const audiences = await Audience.find();
        res.json(audiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function audienceCreate(req, res) {
    try {
        req.body.image=req.file.path ?? '';
        // Create a new audience based on request body (example)
        const newAudience = await Audience.create(req.body);
        res.status(201).json(newAudience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function benefit(req, res) {
    try {
        // Fetch benefits from the database (example)
        const benefits = await Benifit.find();
        res.json(benefits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function benefitCreate(req, res) {
    try {
        req.body.image=req.file.path ?? '';
        // Create a new benefit based on request body (example)
        const newBenefit = await Benifit.create(req.body);
        res.status(201).json(newBenefit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
async function testimonial(req, res) {
    try {
        // Fetch benefits from the database (example)
        const benefits = await Testimonial.find();
        res.json(benefits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function testimonialcreate(req, res) {
    try {
        req.body.image=req.file.path ?? '';
        // Create a new benefit based on request body (example)
        const newBenefit = await Testimonial.create(req.body);
        res.status(201).json(newBenefit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function offering(req, res) {
    try {
        // Fetch benefits from the database (example)
        const benefits = await Offering.find();
        res.json(benefits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function offeringcreate(req, res) {
    try {
        // Create a new benefit based on request body (example)
        const newBenefit = await Offering.create(req.body);
        res.status(201).json(newBenefit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Export all controller functions
module.exports = {
    process,
    processCreate,
    faq,
    faqCreate,
    audience,
    audienceCreate,
    benefit,
    benefitCreate,
    testimonialcreate,
    testimonial,
    offering,
    offeringcreate
};
