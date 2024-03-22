const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    paid: {
        type: Boolean,
        // required: true,
    },
    customerId: {
        type: String,
        // required: true,
    },
    products: {
        type: Array,
        // required: true,
    },
    total: {
        type: Number,
        // required: true,
    },
    datedOrdered: {
        type: String,
        // required: true,
    },
    datePacked: {
        type: String,
        // required: true,
    },
    deliveryMethod: {
        type: String,
        // required: true,
    },
    deliveryDate: {
        type: String,
        // required: true,
    },
    packedDate: {
        type: String,
        // required: true,
    },
    shippedDate: {
        type: String,
        // required: true,
    },
    
},{ collection: 'orders' });

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;