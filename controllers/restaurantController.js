const Restaurant = require('../models/Restaurant');

// @route  GET /restaurants
// @desc   Get list of all restaurants from MongoDB
const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (err) {
    next(err);
  }
};

// @route  GET /restaurants/top
// @desc   Show top 5 restaurants based on rating (Extra Task)
// NOTE: defined before /:id in routes so it isn't shadowed
const getTopRestaurants = async (req, res, next) => {
  try {
    const topRestaurants = await Restaurant.find().sort({ rating: -1 }).limit(5);
    res.status(200).json({
      success: true,
      count: topRestaurants.length,
      data: topRestaurants,
    });
  } catch (err) {
    next(err);
  }
};

// @route  GET /restaurants/:id
// @desc   Get restaurant by ID
const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (err) {
    next(err);
  }
};

// @route  POST /restaurants
// @desc   Add a new restaurant (JWT authentication required)
const createRestaurant = async (req, res, next) => {
  try {
    const { name, city, address, cuisine, rating } = req.body;

    if (!name || !city || !address || !cuisine || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: 'name, city, address, cuisine, and rating are all required',
      });
    }

    const restaurant = await Restaurant.create({ name, city, address, cuisine, rating });

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: restaurant,
    });
  } catch (err) {
    next(err);
  }
};

// @route  PUT /restaurants/:id
// @desc   Update restaurant details in MongoDB (JWT required)
const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      data: restaurant,
    });
  } catch (err) {
    next(err);
  }
};

// @route  DELETE /restaurants/:id
// @desc   Delete restaurant by ID from MongoDB (JWT required)
const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRestaurants,
  getTopRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
