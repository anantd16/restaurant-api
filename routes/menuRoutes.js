const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

// PUT /menu/:id - Update menu item details (JWT required)
router.put('/:id', authenticate, updateMenuItem);

// DELETE /menu/:id - Delete menu item by ID (JWT required)
router.delete('/:id', authenticate, deleteMenuItem);

module.exports = router;
