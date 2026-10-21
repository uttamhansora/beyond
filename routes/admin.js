const express = require('express');
const ModelConfig = require('../src/models/ModelConfig');
const router = express.Router();

// Display form to create a new model
router.get('/createmodel', (req, res) => {
  res.render('admin/createModel');
});

// Save new model with dynamic fields
router.post('/createmodels', async (req, res) => {
  const { modelName, fieldNames, fieldTypes, fieldRequired } = req.body;

  // Build field array
  const validFieldRequired = Array.isArray(fieldRequired) ? fieldRequired : [];
  const fields = fieldNames.map((name, index) => ({
    name,
    type: fieldTypes[index],
    required: validFieldRequired.includes(index.toString())
  }));

  const newModel = new ModelConfig({ modelName, fields });
  await newModel.save();

  res.redirect('/models');
});

// List all created models
router.get('/models', async (req, res) => {
  const models = await ModelConfig.find();
  res.render('admin/listModels', { models });
});

module.exports = router;
