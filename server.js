require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Core middleware
app.use(express.json());
app.use(requestLogger); // logs every request: method, path, time

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Restaurant APIs' });
});

// Routes
app.use('/', authRoutes); // /register, /login
app.use('/restaurants', restaurantRoutes); // /restaurants, /restaurants/:id, /restaurants/:id/menu
app.use('/menu', menuRoutes); // /menu/:id

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
