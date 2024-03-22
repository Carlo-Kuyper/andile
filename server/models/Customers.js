const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  cardname: {
    type: String,
    // required: true,
  },
  cellnr: {
    type: Number,
    // required: true,
  },
  cardnr: {
    type: Number,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  expirymonth: {
    type: Number,
    // required: true,
  },
  expiryyear: {
    type: Number,
    // required: true,
  },
  postalcode: {
    type: Number,
    // required: true,
  },
  province: {
    type: String,
    // required: true,
  },
  streetaddress: {
    type: String,
    // required: true,
  },
  suburb: {
    type: String,
    // required: true,
  },

},  { collection: 'customers' });

const Customers = mongoose.model('Customers', customersSchema);

module.exports = Customers;