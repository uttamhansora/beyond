const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            attributes: [
                {
                    attribute_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'ProductAttribute'
                    },
                    attr_price: {
                        type: String
                    }
                }
            ],
            total_item_price: {
                type: String
            }
        }
    ],
    address: {
        type: String
    },
    total_price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        default: 'pending'
    },
    order_status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);