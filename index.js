const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/romi_books', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Set up Express app
const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// Use API routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});