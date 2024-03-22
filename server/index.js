require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/mongoose');

const corsOptions = {
    origin: 'http://localhost:3000', // or your specific allowed domain
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const product = require('./routes/product');
const coffees = require('./routes/coffees');
const orders = require('./routes/orders');
const customers = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes here...
app.use('/product', cors(corsOptions), product);
app.use('/coffees', cors(corsOptions), coffees);

app.use('/customer', cors(corsOptions), customers);
app.use('/orders', cors(corsOptions), orders);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});