const SDevelopmentCenter = require('../models/SDevelopmentCenter');

// Helper function to generate slugs
function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
}

// List entries
const list = async (req, res) => {
    try {
        const entries = await SDevelopmentCenter.find().sort({ _id: -1 });
        res.render('admin/sDevelopmentCenterList', { entries });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// View create/edit form
const view = async (req, res) => {
    const { id } = req.params;
    const entry = await SDevelopmentCenter.findOne({"_id":id});
    res.render('admin/sDevelopmentCenterForm', { entry });
};

// Create or update entry
const createOrUpdate = async (req, res) => {
    try {
        const { id, heading, title, image_title, title2 } = req.body;
        const slug = generateSlug(title);
        const image = req.file ? req.file.path : undefined;
        
        if (id) {
            // Update existing entry
            const entry = await SDevelopmentCenter.findById(id);
            Object.assign(entry, { heading, title, image_title, title2, slug, image: image || entry.image });
            await entry.save();
        } else {
            // Create new entry
            const entry = new SDevelopmentCenter({ heading, title, image_title, title2, slug, image });
            await entry.save();
        }
        
        res.redirect('/sDevelopmentCenter');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete entry
const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await SDevelopmentCenter.findByIdAndDelete(id);
        res.redirect('/sDevelopmentCenter');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { list, view, createOrUpdate, deleteEntry };
