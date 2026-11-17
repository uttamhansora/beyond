'use strict';

const Home = require('../models/Home');

const DEFAULTS = {
    about: {
        heading: 'About Us',
        subheading: 'Securing Businesses Beyond Vulnerabilities',
        description: 'We are a modern cybersecurity and penetration testing company dedicated to helping businesses identify, prevent, and eliminate security vulnerabilities before attackers can exploit them. Our team of certified security experts delivers enterprise-grade penetration testing, VAPT services, cloud security assessments, API testing, and managed cybersecurity solutions tailored for startups, enterprises, and global organizations.',
        trust_line: 'Trusted by 135+ enterprises worldwide',
        cta_text: 'Know More',
        cta_link: '/company',
        image: '',
    },
    resources: {
        heading: 'Resources',
        items: [
            {
                eyebrow: 'Blog',
                title: 'Strengthening Security for a Multi-Tenant SaaS App Builder Through Web & API Penetration Testing',
                link: '/blog/how-a-web-application-pentest-uncovered-critical-vulnerabilities-before-a-major-product-launch',
                cta: 'Read now',
                image: 'https://whitenet.io/wp-content/uploads/2026/06/Strengthening-Security-for-a-Multi-Tenant-SaaS-App-Builder-Through-Web-API-Penetration-Testing.png',
            },
            {
                eyebrow: 'Blog',
                title: 'How a Web Application Pentest Uncovered Critical Vulnerabilities Before a Major Product Launch',
                link: '/blog/how-a-web-application-pentest-uncovered-critical-vulnerabilities-before-a-major-product-launch',
                cta: 'Read now',
                image: 'https://whitenet.io/wp-content/uploads/2026/06/ChatGPT-Image-Jun-29-2026-10_26_03-PM.png',
            },
            {
                eyebrow: 'Blog',
                title: 'How to Create a Business Plan That Drives',
                link: '/blog/how-a-web-application-pentest-uncovered-critical-vulnerabilities-before-a-major-product-launch',
                cta: 'Read now',
                image: 'https://whitenet.io/wp-content/uploads/2024/10/Post-5.jpg',
            },
        ],
    },
    case_studies: {
        heading: 'Case Studies',
        items: [
            {
                eyebrow: 'Case Study',
                title: 'Strengthening Security for a Multi-Tenant SaaS App Builder Through Web & API Penetration Testing',
                link: '/case-studies',
                cta: 'Read now',
                image: 'https://whitenet.io/wp-content/uploads/2026/06/Strengthening-Security-for-a-Multi-Tenant-SaaS-App-Builder-Through-Web-API-Penetration-Testing.png',
            },
            {
                eyebrow: 'Case Study',
                title: 'ODEON Cinemas Group: Unified Security Across 8 Countries and 280+ Cinemas',
                link: '/case-studies',
                cta: 'Read now',
                image: '',
            },
        ],
    },
};

function ok(data, message) {
    return {
        success: true,
        statusCode: 200,
        message,
        data,
    };
}

function asEntries(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.map((item, index) => ({ index, item: item || {} }));
    }
    if (typeof value === 'object') {
        return Object.keys(value)
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => ({ index: key, item: value[key] || {} }));
    }
    return [];
}

function uploaded(files, fieldname) {
    const file = (files || []).find((item) => item.fieldname === fieldname);
    return file ? String(file.path).replace(/\\/g, '/') : '';
}

function keptFile(value) {
    const path = String(value || '').trim().replace(/\\/g, '/');
    if (!path) return '';
    if (path.startsWith('public/files/') || /^(https?:)?\/\//i.test(path) || path.startsWith('/')) {
        return path;
    }
    return '';
}

function cards(group, files, prefix) {
    return asEntries(group)
        .map(({ index, item }) => ({
            eyebrow: String(item.eyebrow || '').trim(),
            title: String(item.title || '').trim(),
            link: String(item.link || '').trim(),
            cta: String(item.cta || '').trim(),
            image: uploaded(files, `${prefix}_${index}`) || keptFile(item.image),
        }))
        .filter((item) => item.title);
}

async function getOrCreate() {
    let doc = await Home.findOne({ home_sections_ready: true });
    if (!doc) doc = await Home.findOne();
    if (!doc) {
        return Home.create({
            ...DEFAULTS,
            home_sections_ready: true,
        });
    }
    if (!doc.home_sections_ready) {
        doc.set({
            ...DEFAULTS,
            home_sections_ready: true,
        });
        await doc.save();
    }
    return doc;
}

const homeSectionForm = async (req, res) => {
    try {
        const doc = await getOrCreate();
        res.render('admin/homesections', {
            page: doc.toObject(),
            saved: req.query.saved === '1',
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const homeSectionStore = async (req, res) => {
    try {
        const existing = await getOrCreate();
        const about = req.body.about || {};
        const aboutImage = uploaded(req.files, 'about_image') || keptFile(about.image);

        await existing.updateOne({
            home_sections_ready: true,
            about: {
                heading: String(about.heading || '').trim(),
                subheading: String(about.subheading || '').trim(),
                description: String(about.description || '').trim(),
                trust_line: String(about.trust_line || '').trim(),
                cta_text: String(about.cta_text || '').trim(),
                cta_link: String(about.cta_link || '').trim(),
                image: aboutImage,
            },
            resources: {
                heading: String(req.body.resources_heading || '').trim(),
                items: cards(req.body.resources, req.files, 'resource_image'),
            },
            case_studies: {
                heading: String(req.body.case_studies_heading || '').trim(),
                items: cards(req.body.case_studies, req.files, 'case_image'),
            },
        });

        res.redirect('/homesections?saved=1');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const apiHomeSections = async (req, res) => {
    try {
        const doc = await getOrCreate();
        res.json(ok(doc, 'Home sections loaded.'));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    homeSectionForm,
    homeSectionStore,
    apiHomeSections,
};
