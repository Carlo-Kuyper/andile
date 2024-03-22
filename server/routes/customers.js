const express = require('express');
const bcrypt = require('bcryptjs'); // You'll need bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // And jsonwebtoken for creating tokens
const CustomersModel = require('../models/Customers');
const router = express.Router();


// Get all Customers
router.get('/', async (req, res) => {
  try {
    const customers = await CustomersModel.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single Customers by ID
router.get('/:id', async (req, res) => {
  try {
    const customers = await CustomersModel.findById(req.params.id);
    if (!customers) return res.status(404).json({ message: 'Customers not found' });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new customers
router.post('/', async (req, res) => {
    try {
      const newCustomers = new CustomersModel({
        name: req.body.name,
        email: req.body.email,
        password:  req.body.password,
      });
      const savedCustomers = await newCustomers.save();
      res.status(201).json(savedCustomers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding Customers' });
    }
});

// Update a Customers by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomers = await CustomersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomers) return res.status(404).json({ message: 'Customers not found' });
    res.json(updatedCustomers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Customers by ID
router.delete('/:id', async (req, res) => {
  try {
    const customers = await CustomersModel.findByIdAndDelete(req.params.id);
    if (!customers) return res.status(404).json({ message: 'Customers not found' });
    res.json({ message: 'Customers deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Batch delete Customers by IDs
router.post('/remove-Customers', async (req, res) => {
  try {
    const results = await CustomersModel.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'Customers deleted', deletedCount: results.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Sign-up route
router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
      // Check if user already exists
      const existingUser = await CustomersModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
      // Create new user
      const newUser = new CustomersModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
      // Save user
      const savedUser = await newUser.save();
  
      // Respond with the new user (excluding the password)
      res.status(201).json({ user: { name: savedUser.name, email: savedUser.email } });
    } catch (err) {
      res.status(500).json({ message: 'Error creating user' });
    }
});


// Sign-in route
router.post('/signin', async (req, res) => {
    try {
        // Find user by email
        const user = await CustomersModel.findOne({ email: req.body.email });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });

        // Respond with token (and user data if needed)
        res.status(200).json({ token, user: { id: user._id, 
                                              name: user.name, 
                                              email: user.email, 
                                              cellnr: user.cellnr,
                                              city: user.city,
                                              postalcode: user.postalcode,
                                              province: user.province,
                                              streetaddress: user.streetaddress,
                                              streetnr: user.streetnr,
                                              suburb: user.suburb,
                                            } });
      } catch (err) {
        res.status(500).json({ message: 'Error signing in' });
    }
});
  
module.exports = router;