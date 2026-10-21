const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeneralSetting = new Schema({
    usd_price: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('GeneralSetting', GeneralSetting);