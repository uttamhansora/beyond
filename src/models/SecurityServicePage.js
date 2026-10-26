const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labeledIcon = new Schema({
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
}, { _id: false });

const titledText = new Schema({
    title: { type: String, default: '' },
    text: { type: String, default: '' },
}, { _id: false });

const iconCard = new Schema({
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
}, { _id: false });

const featureStep = new Schema({
    label: { type: String, default: '' },
    body: { type: String, default: '' },
}, { _id: false });

const logoItem = new Schema({
    alt: { type: String, default: '' },
    image: { type: String, default: '' },
}, { _id: false });

const SecurityServicePage = new Schema({
    title: String,
    slug: { type: String, unique: true, index: true },
    main_category: { type: String, default: '' },
    subcategory: { type: String, default: '' },
    category: { type: String, default: '' },
    layout: { type: String, default: 'network' },
    status: { type: String, default: 'draft' },
    meta_title: String,
    meta_description: String,

    hero: {
        breadcrumb_label: { type: String, default: 'Services' },
        breadcrumb_link: { type: String, default: '/services' },
        breadcrumb_current: String,
        heading: String,
        summary: String,
        description: String,
        cta_text: String,
        cta_link: String,
        bg_image: String,
    },

    what_we_test: {
        heading: String,
        subheading: String,
        card_heading: String,
        preview_items: [String],
        items: [String],
        cta_text: String,
        cta_link: String,
    },

    secure_cta: {
        title: String,
        description: String,
        button_text: String,
        button_link: String,
        bg_image: String,
    },

    threats: {
        title: String,
        description: String,
        items: [labeledIcon],
    },

    approach: {
        eyebrow: String,
        title: String,
        lede: String,
        cta_text: String,
        cta_link: String,
        steps: [titledText],
    },

    why: {
        title: String,
        description: String,
        items: [String],
        cta_text: String,
        cta_link: String,
    },

    clients: {
        label: String,
        logos: [logoItem],
    },

    methodology: {
        heading: String,
        subheading: String,
        cards: [iconCard],
    },

    features: {
        badge: String,
        title: String,
        intro: String,
        steps: [featureStep],
    },

    get_started: {
        heading: String,
        subheading: String,
        text: String,
        button_text: String,
        privacy_label: String,
        privacy_text: String,
        first_name_label: String,
        last_name_label: String,
        email_label: String,
        company_label: String,
        country_label: String,
        hear_label: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('SecurityServicePage', SecurityServicePage);
