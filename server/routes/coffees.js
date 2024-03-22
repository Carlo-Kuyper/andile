const express = require('express');
const CoffeesModel = require('../models/Coffees');
const router = express.Router();

// Get all Coffees
router.get('/', async (req, res) => {
  try {
    const coffees = await CoffeesModel.find();
    res.json(coffees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single Coffees by ID
router.get('/:id', async (req, res) => {
  try {
    const coffees = await CoffeesModel.findById(req.params.id);
    if (!coffees) return res.status(404).json({ message: 'Coffees not found' });
    res.json(coffees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new Coffees
router.post('/', async (req, res) => {
    try {
      const newCoffees = new CoffeesModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        roaststretght: req.body.roaststretght,
        stock: req.body.stock,
        weight: req.body.weight,
      });
      const savedCoffees = await newCoffees.save();
      res.status(201).json(savedCoffees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding Coffees' });
    }
  });

// Update a Coffees by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCoffees = await CoffeesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCoffees) return res.status(404).json({ message: 'Coffees not found' });
    res.json(updatedCoffees);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Coffees by ID
router.delete('/:id', async (req, res) => {
  try {
    const coffees = await CoffeesModel.findByIdAndDelete(req.params.id);
    if (!coffees) return res.status(404).json({ message: 'Coffees not found' });
    res.json({ message: 'Coffees deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Batch delete Coffees by IDs
router.post('/remove-coffees', async (req, res) => {
  try {
    const results = await CoffeesModel.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'Coffees deleted', deletedCount: results.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;