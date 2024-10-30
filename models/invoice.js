const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    internalId: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true }, // Add this line
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
});

module.exports = mongoose.model('Invoice', invoiceSchema);