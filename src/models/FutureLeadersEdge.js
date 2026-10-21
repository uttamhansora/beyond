const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FutureLeadersEdge = new Schema({
    name: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('FutureLeadersEdge', FutureLeadersEdge);