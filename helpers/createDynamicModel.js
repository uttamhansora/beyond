const mongoose = require('mongoose');
const ModelConfig = require('../src/models/ModelConfig');

const modelCache = {};

async function createDynamicModel(modelName) {
    if (typeof modelName !== 'string' || !/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(modelName)) {
      throw new Error('Invalid model name');
    }
    if (modelCache[modelName]) return modelCache[modelName];

    const config = await ModelConfig.findOne({ modelName });
    if (!config) throw new Error(`No model configuration found for ${modelName}`);
  
    // Prepare the schema fields dynamically based on the configuration
    const schemaFields = {};
    const allowedTypes = { String, Number, Boolean, Date };
    config.fields.forEach(field => {
      if (!field || !/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(field.name || '')) return;
      schemaFields[field.name] = {
        type: allowedTypes[field.type] || String,
        required: field.required === true,
      };
    });
  
    const schema = new mongoose.Schema(schemaFields, { timestamps: true, autoIndex: false });
    const model = mongoose.models[modelName] || mongoose.model(modelName, schema);
  
    // Cache the created model
    modelCache[modelName] = model;
  
    console.log(`Model ${modelName} created successfully.`);
    return model;
  }
module.exports = createDynamicModel;
