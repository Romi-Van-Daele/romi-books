// Load suppliers for invoice selection
async function loadSuppliersForInvoice() {
    const response = await fetch('/api/suppliers');
    const suppliers = await response.json();
    const supplierSelect = document.getElementById('invoice-supplier');
    supplierSelect.innerHTML = '';

    // Add "Create New Supplier" option
    const createNewOption = document.createElement('option');
    createNewOption.value = 'create-new';
    createNewOption.textContent = 'Create New Supplier';
    supplierSelect.appendChild(createNewOption);

    // Add existing suppliers
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier._id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
}

// Load suppliers
async function loadSuppliers() {
    const response = await fetch('/api/suppliers');
    const suppliers = await response.json();
    const supplierList = document.getElementById('supplier-list');
    supplierList.innerHTML = '';
    suppliers.forEach(supplier => {
        const li = document.createElement('li');
        li.textContent = `${supplier.name} (ID: ${supplier.internalId})`;
        li.addEventListener('click', () => loadSupplierData(supplier)); // Add click event to load supplier data
        supplierList.appendChild(li);
    });
}

// Load supplier data into the form for editing
async function loadSupplierData(supplier) {
    document.getElementById('supplier-id').value = supplier._id;
    document.getElementById('supplier-name').value = supplier.name;
    document.getElementById('supplier-address').value = supplier.address;
    document.getElementById('supplier-vat').value = supplier.vatNumber;
    document.getElementById('supplier-internal-id').value = supplier.internalId;

    document.getElementById('supplier-form').classList.remove('hidden'); // Show the form
}

// Handle the supplier form submission
const supplierForm = document.getElementById('supplier-form');
supplierForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const supplierId = document.getElementById('supplier-id').value;
    const supplierName = document.getElementById('supplier-name').value;
    const supplierAddress = document.getElementById('supplier-address').value;
    const supplierVAT = document.getElementById('supplier-vat').value;
    const supplierInternalId = document.getElementById('supplier-internal-id').value;
console.log(supplierVAT)
    // Update the supplier
    await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: supplierName,
            address: supplierAddress,
            vatNumber: supplierVAT,
            internalId: supplierInternalId,
        }),
    });

    // Reload suppliers and reset the form
    loadSuppliers();
    supplierForm.reset();
    supplierForm.classList.add('hidden'); // Hide the form after update
});

// Handle the invoice form submission
const invoiceForm = document.getElementById('invoice-form');
invoiceForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const invoiceId = document.getElementById('invoice-id').value;
    const title = document.getElementById('invoice-title').value;
    const date = document.getElementById('invoice-date').value;
    const amount = document.getElementById('invoice-amount').value;
    const supplierId = document.getElementById('invoice-supplier').value;

    const invoiceData = {
        title,
        date,
        amount,
        supplier: supplierId === 'new-supplier' ? null : supplierId,
    };

    if (invoiceId) {
        // Update the invoice
        await fetch(`/api/invoices/${invoiceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        });
    } else {
        // Create a new invoice
        await fetch('/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        });
    }

    loadInvoices(); // Refresh the list
    clearInvoiceForm(); // Clear the form
    invoiceForm.reset();
});

// Load invoices
async function loadInvoices() {
    const response = await fetch('/api/invoices');
    const invoices = await response.json();
    const invoiceList = document.getElementById('invoice-list');
    invoiceList.innerHTML = '';
    invoices.forEach(invoice => {
        const li = document.createElement('li');
        li.textContent = `${invoice.title} (ID: ${invoice.internalId}, Amount: ${invoice.amount}, Date: ${new Date(invoice.date).toLocaleDateString()}, Supplier: ${invoice.supplier.name})`;
        
        li.onclick = () => {
            populateInvoiceForm(invoice); // Call a function to populate the form
        };
        invoiceList.appendChild(li);
    });
}

// Populate form with existing invoice data
function populateInvoiceForm(invoice) {
    document.getElementById('invoice-internal-id').value = invoice.internalId;
    document.getElementById('invoice-title').value = invoice.title;
    document.getElementById('invoice-date').value = new Date(invoice.date).toISOString().split('T')[0];
    document.getElementById('invoice-amount').value = invoice.amount;
    document.getElementById('invoice-supplier').value = invoice.supplier;
}

// Show selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// Initial load
loadSuppliersForInvoice();
loadInvoices();
loadSuppliers(); // Load suppliers on startup

// Event listeners for navigation
document.getElementById('show-suppliers').addEventListener('click', () => {
    showSection('suppliers-section');
    loadSuppliers(); // Load suppliers every time the section is shown
});

document.getElementById('show-invoices').addEventListener('click', () => {
    showSection('invoices-section');
});

document.getElementById('show-projects').addEventListener('click', () => {
    showSection('projects-section');
});