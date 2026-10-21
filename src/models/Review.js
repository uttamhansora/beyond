const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const ReviewSchema = new Schema({
  product_id: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  user_id: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title:{
    type:String
  },
  comment: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);