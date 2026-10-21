'use strict';
const mongoose = require('mongoose');
const SecurityServicePage = require('../models/SecurityServicePage');

function generateSlug(name) {
    return String(name || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '');
}

function lines(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof value === 'string') {
        return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    }
    return [];
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

function keptFile(typedValue) {
    const value = String(typedValue || '').trim().replace(/\\/g, '/');
    return value.startsWith('public/files/') ? value : '';
}

function textOrFile(files, fieldname, typedValue) {
    return uploaded(files, fieldname) || keptFile(typedValue);
}

function buildPayload(body, files) {
    const hero = body.hero || {};
    const what = body.what_we_test || {};
    const secure = body.secure_cta || {};
    const threats = body.threats || {};
    const approach = body.approach || {};
    const why = body.why || {};
    const clients = body.clients || {};
    const methodology = body.methodology || {};
    const features = body.features || {};
    const started = body.get_started || {};

    return {
        title: String(body.title || '').trim(),
        slug: generateSlug(body.slug || body.title),
        category: body.category || (body.layout === 'application' ? 'Application' : 'Infrastructure'),
        layout: body.layout === 'application' ? 'application' : 'network',
        status: body.status === 'published' ? 'published' : 'draft',
        meta_title: body.meta_title || '',
        meta_description: body.meta_description || '',
        hero: {
            breadcrumb_label: hero.breadcrumb_label || '',
            breadcrumb_link: hero.breadcrumb_link || '',
            breadcrumb_current: hero.breadcrumb_current || '',
            heading: hero.heading || '',
            summary: hero.summary || '',
            description: hero.description || '',
            cta_text: hero.cta_text || '',
            cta_link: hero.cta_link || '',
            bg_image: textOrFile(files, 'hero_bg_file', hero.bg_image),
        },
        what_we_test: {
            heading: what.heading || '',
            subheading: what.subheading || '',
            card_heading: what.card_heading || '',
            preview_items: lines(what.preview_items),
            items: lines(what.items),
            cta_text: what.cta_text || '',
            cta_link: what.cta_link || '',
        },
        secure_cta: {
            title: secure.title || '',
            description: secure.description || '',
            button_text: secure.button_text || '',
            button_link: secure.button_link || '',
            bg_image: textOrFile(files, 'secure_cta_bg_file', secure.bg_image),
        },
        threats: {
            title: threats.title || '',
            description: threats.description || '',
            items: asEntries(threats.items).map(({ index, item }) => ({
                label: item.label || '',
                icon: textOrFile(files, `threats[items][${index}][icon_file]`, item.icon),
            })).filter((item) => item.label || item.icon),
        },
        approach: {
            eyebrow: approach.eyebrow || '',
            title: approach.title || '',
            lede: approach.lede || '',
            cta_text: approach.cta_text || '',
            cta_link: approach.cta_link || '',
            steps: asEntries(approach.steps).map(({ item }) => ({
                title: item.title || '',
                text: item.text || '',
            })).filter((item) => item.title || item.text),
        },
        why: {
            title: why.title || '',
            description: why.description || '',
            items: lines(why.items),
            cta_text: why.cta_text || '',
            cta_link: why.cta_link || '',
        },
        clients: {
            label: clients.label || '',
            logos: asEntries(clients.logos).map(({ index, item }) => ({
                alt: item.alt || '',
                image: textOrFile(files, `clients[logos][${index}][image_file]`, item.image),
            })).filter((item) => item.alt || item.image),
        },
        methodology: {
            heading: methodology.heading || '',
            subheading: methodology.subheading || '',
            cards: asEntries(methodology.cards).map(({ index, item }) => ({
                title: item.title || '',
                text: item.text || '',
                icon: textOrFile(files, `methodology[cards][${index}][icon_file]`, item.icon),
            })).filter((item) => item.title || item.text || item.icon),
        },
        features: {
            badge: features.badge || '',
            title: features.title || '',
            intro: features.intro || '',
            steps: asEntries(features.steps).map(({ item }) => ({
                label: item.label || '',
                body: item.body || '',
            })).filter((item) => item.label || item.body),
        },
        get_started: {
            heading: started.heading || '',
            subheading: started.subheading || '',
            text: started.text || '',
            button_text: started.button_text || '',
            privacy_label: started.privacy_label || '',
            privacy_text: started.privacy_text || '',
            first_name_label: started.first_name_label || '',
            last_name_label: started.last_name_label || '',
            email_label: started.email_label || '',
            company_label: started.company_label || '',
            country_label: started.country_label || '',
            hear_label: started.hear_label || '',
        },
    };
}

function viewModel(page) {
    const data = page ? (page.toObject ? page.toObject() : page) : null;
    return {
        page: data,
        previewItems: (data?.what_we_test?.preview_items || []).join('\n'),
        testItems: (data?.what_we_test?.items || []).join('\n'),
        whyItems: (data?.why?.items || []).join('\n'),
    };
}

function editorFor(layout) {
    if (layout === 'application') {
        return {
            list: '/applicationservicepage',
            create: '/createapplicationservicepage',
            template: 'admin/createapplicationservicepage',
        };
    }
    return {
        list: '/securityservicepage',
        create: '/createsecurityservicepage',
        template: 'admin/createsecurityservicepage',
    };
}

const securityservicepage = (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('admin/securityservicepage', { message });
};

const applicationservicepage = (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('admin/applicationservicepage', { message });
};

async function pageTable(req, res, layout) {
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10) || 0;
    const length = parseInt(req.query.length, 10) || 10;
    const searchValue = req.query.search?.value || '';
    const layoutFilter = layout === 'application'
        ? { layout: 'application' }
        : { layout: { $ne: 'application' } };
    const filter = searchValue
        ? { ...layoutFilter, title: { $regex: searchValue, $options: 'i' } }
        : layoutFilter;

    const totalRecords = await SecurityServicePage.countDocuments(layoutFilter);
    const filteredRecords = await SecurityServicePage.countDocuments(filter);
    const data = await SecurityServicePage.find(filter)
        .sort({ _id: -1 })
        .skip(start)
        .limit(length)
        .lean();

    res.json({
        draw,
        recordsTotal: totalRecords,
        recordsFiltered: filteredRecords,
        data,
    });
}

const securityservicepages = (req, res) => pageTable(req, res, 'network');
const applicationservicepages = (req, res) => pageTable(req, res, 'application');

async function renderEditor(req, res, layout) {
    const editor = editorFor(layout);
    const id = req.params.id;
    const message = req.session.message;
    req.session.message = null;
    if (id) {
        const page = await SecurityServicePage.findById(id);
        if (page) {
            const actual = editorFor(page.layout);
            if (actual.create !== editor.create) {
                return res.redirect(`${actual.create}/${page._id}`);
            }
        }
        return res.render(editor.template, { ...viewModel(page), message });
    }
    res.render(editor.template, { ...viewModel(null), message });
}

const securityservicecreate = (req, res) => renderEditor(req, res, 'network');
const applicationservicecreate = (req, res) => renderEditor(req, res, 'application');

const storesecurityservicepage = async (req, res) => {
    const editor = editorFor(req.body.layout);
    const back = req.body.id ? `${editor.create}/${req.body.id}` : editor.create;
    try {
        const payload = buildPayload(req.body, req.files);
        if (!payload.title || !payload.slug) {
            req.session.message = 'Title is required.';
            return res.redirect(back);
        }

        const duplicate = await SecurityServicePage.findOne({
            slug: payload.slug,
            ...(req.body.id ? { _id: { $ne: req.body.id } } : {}),
        });
        if (duplicate) {
            req.session.message = 'That slug is already used. Choose a different title or slug.';
            return res.redirect(back);
        }

        if (req.body.id) {
            await SecurityServicePage.findByIdAndUpdate(req.body.id, payload, { runValidators: true });
            req.session.message = 'Service page updated.';
        } else {
            await SecurityServicePage.create(payload);
            req.session.message = 'Service page created.';
        }
        res.redirect(editor.list);
    } catch (error) {
        console.error(error);
        req.session.message = 'Could not save the service page.';
        res.redirect(back);
    }
};

const deletesecurityservicepage = async (req, res) => {
    let list = '/securityservicepage';
    try {
        const page = await SecurityServicePage.findById(req.params.id);
        if (page) list = editorFor(page.layout).list;
        await SecurityServicePage.findByIdAndDelete(req.params.id);
        req.session.message = 'Service page deleted.';
    } catch (error) {
        console.error(error);
        req.session.message = 'Could not delete the service page.';
    }
    res.redirect(list);
};

const SECTIONS = ['hero', 'what_we_test', 'secure_cta', 'threats', 'approach', 'why', 'clients', 'methodology', 'features', 'get_started'];

function isObjectId(value) {
    return mongoose.Types.ObjectId.isValid(value);
}

const apisecurityservicepages = async (req, res) => {
    try {
        const filter = {};
        if (req.query.status === 'published' || req.query.status === 'draft') {
            filter.status = req.query.status;
        } else if (req.query.status !== 'all') {
            filter.status = 'published';
        }
        if (req.query.layout === 'application' || req.query.layout === 'network') {
            filter.layout = req.query.layout;
        }
        const pages = await SecurityServicePage.find(filter).sort({ title: 1 }).lean();
        res.json({ success: true, data: pages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not load service pages.' });
    }
};

const apisecurityservicepage = async (req, res) => {
    try {
        const filter = { slug: req.params.slug };
        if (req.query.status !== 'all') filter.status = 'published';
        const page = await SecurityServicePage.findOne(filter).lean();
        if (!page) {
            return res.status(404).json({ success: false, message: 'Service page not found.' });
        }
        res.json({ success: true, data: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not load the service page.' });
    }
};

const apiapplicationservicepages = async (req, res) => {
    try {
        const pages = await SecurityServicePage.find({ layout: 'application', status: 'published' }).sort({ title: 1 }).lean();
        res.json({ success: true, data: pages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not load application pages.' });
    }
};

const apiapplicationservicepage = async (req, res) => {
    try {
        const page = await SecurityServicePage.findOne({
            slug: req.params.slug,
            layout: 'application',
            status: 'published',
        }).lean();
        if (!page) {
            return res.status(404).json({ success: false, message: 'Application page not found.' });
        }
        res.json({ success: true, data: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not load the application page.' });
    }
};

const apisecurityservicepagebyid = async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid page id.' });
        }
        const page = await SecurityServicePage.findById(req.params.id).lean();
        if (!page) {
            return res.status(404).json({ success: false, message: 'Service page not found.' });
        }
        res.json({ success: true, data: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not load the service page.' });
    }
};

async function saveFromApi(req, res, existing) {
    const body = req.body || {};
    const current = existing && existing.toObject ? existing.toObject() : existing;
    const payload = buildPayload(body, req.files);
    if (current) {
        SECTIONS.forEach((key) => {
            if (body[key] === undefined) payload[key] = current[key];
        });
        if (body.title === undefined) payload.title = current.title;
        if (body.slug === undefined) payload.slug = current.slug;
        if (body.category === undefined) payload.category = current.category;
        if (body.layout === undefined) payload.layout = current.layout;
        if (body.status === undefined) payload.status = current.status;
        if (body.meta_title === undefined) payload.meta_title = current.meta_title;
        if (body.meta_description === undefined) payload.meta_description = current.meta_description;
    }
    if (!payload.title || !payload.slug) {
        return res.status(400).json({ success: false, message: 'Title is required.' });
    }
    const duplicate = await SecurityServicePage.findOne({
        slug: payload.slug,
        ...(current ? { _id: { $ne: current._id } } : {}),
    });
    if (duplicate) {
        return res.status(409).json({ success: false, message: 'That slug is already used.' });
    }
    const page = current
        ? await SecurityServicePage.findByIdAndUpdate(current._id, payload, { new: true, runValidators: true })
        : await SecurityServicePage.create(payload);
    return res.status(current ? 200 : 201).json({ success: true, data: page });
}

const apicreatesecurityservicepage = async (req, res) => {
    try {
        await saveFromApi(req, res, null);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not create the service page.' });
    }
};

const apiupdatesecurityservicepage = async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid page id.' });
        }
        const existing = await SecurityServicePage.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Service page not found.' });
        }
        await saveFromApi(req, res, existing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not update the service page.' });
    }
};

const apideletesecurityservicepage = async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid page id.' });
        }
        const page = await SecurityServicePage.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, message: 'Service page not found.' });
        }
        res.json({ success: true, message: 'Service page deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Could not delete the service page.' });
    }
};

module.exports = {
    securityservicepage,
    securityservicepages,
    securityservicecreate,
    applicationservicepage,
    applicationservicepages,
    applicationservicecreate,
    storesecurityservicepage,
    deletesecurityservicepage,
    apisecurityservicepages,
    apisecurityservicepage,
    apiapplicationservicepages,
    apiapplicationservicepage,
    apisecurityservicepagebyid,
    apicreatesecurityservicepage,
    apiupdatesecurityservicepage,
    apideletesecurityservicepage,
};
