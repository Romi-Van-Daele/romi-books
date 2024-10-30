const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    vatNumber: { type: String, required: true },
    internalId: { type: String, required: true },
});

module.exports = mongoose.model('Supplier', supplierSchema);