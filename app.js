const express = require('express');
const path = require('path');
const app = express();
const fileRoutes = require('./routes/fileRoutes');

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (uploads directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
