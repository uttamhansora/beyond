const express = require('express');
const createDynamicModel = require('../helpers/createDynamicModel');
const router = express.Router();
const ModelConfig = require('../src/models/ModelConfig');

// List items for a dynamic model
router.get('/:modelName', async (req, res) => {
  const { modelName } = req.params;
  const Model = await createDynamicModel(modelName);
  const items = await Model.find();
  const config = await ModelConfig.findOne({ modelName });
  res.render('dynamic/list', { items, modelName,fields: config.fields });
});

// Display form to add/edit item
router.get('/:modelName/add', async (req, res) => {
  const { modelName } = req.params;
  const config = await ModelConfig.findOne({ modelName });
  res.render('dynamic/addEdit', { modelName, fields: config.fields });
});

// Save new item
router.post('/:modelName', async (req, res) => {
  const { modelName } = req.params;
  const Model = await createDynamicModel(modelName);
  await Model.create(req.body);
  res.redirect(`/dynamic/${modelName}`);
});

module.exports = router;
