const mongoose = require('mongoose');

const coffeesSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    roaststretght: {
        type: Number,
        // required: true,
    },
    weight: {
        type: Number,
        // required: true,
    },
    stock: {
        type: Number,
        // required: true,
    },
    
},{ collection: 'coffees' });

const Coffees = mongoose.model('Coffees', coffeesSchema);

module.exports = Coffees;