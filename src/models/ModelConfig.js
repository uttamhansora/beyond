const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  name: String,            // Field name, e.g., "title", "price"
  type: String,            // Type of field, e.g., "String", "Number", "File", "Textarea"
  required: Boolean,       // Required field or not
});

const ModelConfigSchema = new mongoose.Schema({
  modelName: String,       // Model name, e.g., "Product"
  fields: [FieldSchema],   // Array of fields defined for the model
});

module.exports = mongoose.model('ModelConfig', ModelConfigSchema);