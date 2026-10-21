const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Methodology = new Schema({
   heading:String,
   title:String,
   description:String,
}, {timestamps: true});

module.exports = mongoose.model('Methodology', Methodology);