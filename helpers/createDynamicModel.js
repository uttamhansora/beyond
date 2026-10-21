const mongoose = require('mongoose');
const ModelConfig = require('../src/models/ModelConfig');

const modelCache = {};

async function createDynamicModel(modelName) {
    // Check if the model is already cached
    if (modelCache[modelName]) return modelCache[modelName];
  
    // Check if the model already exists in Mongoose's model registry
    if (mongoose.models[modelName]) {
      console.log(`Model ${modelName} already exists.`);
      return mongoose.models[modelName];  // Return the existing model
    }
  
    // Fetch the model configuration from the database
    const config = await ModelConfig.findOne({ "modelName": modelName });
    if (!config) throw new Error(`No model configuration found for ${modelName}`);
  
    // Prepare the schema fields dynamically based on the configuration
    const schemaFields = {};
    config.fields.forEach(field => {
      // Check if the field type is valid in Mongoose's Schema.Types
      let fieldType = mongoose.Schema.Types[field.type] || String;
      schemaFields[field.name] = { type: fieldType, required: field.required || false }; // Default 'required' to false if not provided
    });
  
    // Create the schema
    const schema = new mongoose.Schema(schemaFields, { timestamps: true });
  
    // Create the model (only if it doesn't already exist)
    const model = mongoose.model(modelName, schema);
  
    // Cache the created model
    modelCache[modelName] = model;
  
    console.log(`Model ${modelName} created successfully.`);
    return model;
  }
module.exports = createDynamicModel;
