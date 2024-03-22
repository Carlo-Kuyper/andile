const express = require('express');
const OrdersModel = require('../models/Orders');
const router = express.Router();

// Get all Orders
router.get('/', async (req, res) => {
  try {
    const Orders = await OrdersModel.find();
    res.json(Orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single Orders by ID
router.get('/:id', async (req, res) => {
  try {
    const orders = await OrdersModel.findById(req.params.id);
    if (!orders) return res.status(404).json({ message: 'Orders not found' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new Orders
router.post('/', async (req, res) => {
    try {
      const newOrders = new OrdersModel({
        paid: req.body.paid,
        customerId: req.body.customerId,
        products: req.body.products,
        total: req.body.total,
        datedOrdered: req.body.datedOrdered,
        datePacked: req.body.datePacked,
        deliveryMethod: req.body.deliveryMethod,
        deliveryDate: req.body.deliveryDate,
        packedDate: req.body.packedDate,
        shippedDate: req.body.shippedDate,
      });
      const savedOrders = await newOrders.save();
      res.status(201).json(savedOrders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding Orders' });
    }
  });

// Update a Orders by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedOrders = await OrdersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrders) return res.status(404).json({ message: 'Orders not found' });
    res.json(updatedOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Orders by ID
router.delete('/:id', async (req, res) => {
  try {
    const orders = await OrdersModel.findByIdAndDelete(req.params.id);
    if (!orders) return res.status(404).json({ message: 'Orders not found' });
    res.json({ message: 'Orders deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Batch delete orders by IDs
router.post('/remove-orders', async (req, res) => {
  try {
    const results = await OrdersModel.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'Orders deleted', deletedCount: results.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;