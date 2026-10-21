const LDevelopmentCenter = require('../models/LDevelopmentCenter');

// Helper function to generate slugs
function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
}

// List entries
const llist = async (req, res) => {
    try {
        const entries = await LDevelopmentCenter.find().sort({ _id: -1 });
        res.render('admin/lDevelopmentCenter', { entries });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// View create/edit form
const lview = async (req, res) => {
    const { id } = req.params;
    const entry = await LDevelopmentCenter.findOne({"_id":id});
    res.render('admin/lDevelopmentCenterForm', { entry });
};

// Create or update entry
const lcreateOrUpdate = async (req, res) => {
    try {
        const { id, heading, title, image_title, title2 } = req.body;
        const slug = generateSlug(title);
        const image = req.file ? req.file.path : undefined;
        
        if (id) {
            // Update existing entry
            const entry = await LDevelopmentCenter.findById(id);
            Object.assign(entry, { heading, title, image_title, title2, slug, image: image || entry.image });
            await entry.save();
        } else {
            // Create new entry
            const entry = new LDevelopmentCenter({ heading, title, image_title, title2, slug, image });
            await entry.save();
        }
        
        res.redirect('/lDevelopmentCenter');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete entry
const ldeleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await LDevelopmentCenter.findByIdAndDelete(id);
        res.redirect('/sDevelopmentCenter');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { llist, lview, lcreateOrUpdate, ldeleteEntry };
