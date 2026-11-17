const express = require('express');
const createDynamicModel = require('../helpers/createDynamicModel');
const router = express.Router();
const ModelConfig = require('../src/models/ModelConfig');

// List items for a dynamic model
router.get('/:modelName', async (req, res) => {
  try {
    const { modelName } = req.params;
    const Model = await createDynamicModel(modelName);
    const items = await Model.find();
    const config = await ModelConfig.findOne({ modelName });
    if (!config) return res.status(404).send('Not found');
    res.render('dynamic/list', { items, modelName, fields: config.fields });
  } catch (error) {
    res.status(404).send('Not found');
  }
});

// Display form to add/edit item
router.get('/:modelName/add', async (req, res) => {
  try {
    const { modelName } = req.params;
    const config = await ModelConfig.findOne({ modelName });
    if (!config) return res.status(404).send('Not found');
    res.render('dynamic/addEdit', { modelName, fields: config.fields });
  } catch (error) {
    res.status(404).send('Not found');
  }
});

// Save new item
router.post('/:modelName', async (req, res) => {
  try {
    const { modelName } = req.params;
    const Model = await createDynamicModel(modelName);
    const payload = req.body && typeof req.body === 'object' ? req.body : {};
    delete payload._id;
    delete payload.__v;
    await Model.create(payload);
    res.redirect(`/dynamic/${modelName}`);
  } catch (error) {
    res.status(400).send('Could not save this item.');
  }
});

module.exports = router;
