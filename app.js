const express = require('express');
const authRoutes = require('./src/routes/auth');
const journalRoutes = require('./src/routes/journals');
const adminRoutes = require('./src/routes/admin');

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/admin', adminRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
