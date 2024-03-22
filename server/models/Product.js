const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    // required: true,
  },
  stock: {
    type: Number,
    // required: true,
  },
  shortdescription: {
    type: String,
    // required: true,
  },
  barcode: {
    type: String,
    // required: true,
  },
  brandtype: {
    type: String,
    // required: true,
  },
  flavour: {
    type: String,
    // required: true,
  },
  roaststretght: {
    type: Number,
    // required: true,
  },
  roasttype: {
    type: String,
    // required: true,
  },
},  { collection: 'product' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;