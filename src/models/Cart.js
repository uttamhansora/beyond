const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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
                default: 1,
                min: 1
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
    total_price: {
        type: String,
        default: '0'
    },
    currency: {
        type: String,
        default: 'INR'
    }
}, {timestamps: true});

module.exports = mongoose.model('Cart', CartSchema);