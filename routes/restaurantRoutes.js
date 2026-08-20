const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const {
  getAllRestaurants,
  getTopRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const {
  getMenuForRestaurant,
  addMenuItem,
} = require('../controllers/menuController');

// IMPORTANT: /top must be declared before /:id so it isn't captured as an id param
router.get('/top', getTopRestaurants);

router.get('/', getAllRestaurants);
router.post('/', authenticate, createRestaurant);

router.get('/:id', getRestaurantById);
router.put('/:id', authenticate, updateRestaurant);
router.delete('/:id', authenticate, deleteRestaurant);

// Nested menu routes
router.get('/:id/menu', getMenuForRestaurant);
router.post('/:id/menu', authenticate, addMenuItem);

module.exports = router;
