const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// @route  GET /restaurants/:id/menu
// @desc   Get all menu items for a specific restaurant
const getMenuForRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const menuItems = await MenuItem.find({ restaurantId: req.params.id });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (err) {
    next(err);
  }
};

// @route  POST /restaurants/:id/menu
// @desc   Add menu item to restaurant (JWT required)
const addMenuItem = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const { name, price, isAvailable } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'name and price are required',
      });
    }

    const menuItem = await MenuItem.create({
      restaurantId: req.params.id,
      name,
      price,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: 'Menu item added successfully',
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

// @route  PUT /menu/:id
// @desc   Update menu item details (JWT required)
const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

// @route  DELETE /menu/:id
// @desc   Delete menu item by ID (JWT required)
const deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMenuForRestaurant, addMenuItem, updateMenuItem, deleteMenuItem };
