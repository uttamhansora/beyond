const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FutureLeadersProcess = new Schema({
    heading: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
}, {timestamps: true});

module.exports = mongoose.model('FutureLeadersProcess', FutureLeadersProcess);