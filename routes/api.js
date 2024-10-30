const express = require('express');
const mongoose = require('mongoose');

// Define your Mongoose schemas
const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    vatNumber: { type: String, required: true },
    internalId: { type: String, required: true },
});

const invoiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    internalId: { type: String, required: true },
    date: { type: Date, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

// Create Mongoose models
const Supplier = mongoose.model('Supplier', supplierSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);
const Project = mongoose.model('Project', projectSchema);

// Set up Express Router
const router = express.Router();

// API routes for suppliers
router.get('/suppliers', async (req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
});

router.post('/suppliers', async (req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.json(supplier);
});

router.put('/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
    res.json(supplier);
});

// API routes for invoices
router.get('/invoices', async (req, res) => {
    const invoices = await Invoice.find().populate('supplier');
    res.json(invoices);
});

router.post('/invoices', async (req, res) => {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.json(invoice);
});

router.put('/invoices/:id', async (req, res) => {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
    res.json(invoice);
});

// API routes for projects
router.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

router.post('/projects', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});

router.put('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json(project);
});

module.exports = router;