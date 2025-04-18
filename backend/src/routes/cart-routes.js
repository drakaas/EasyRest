const express = require('express');
const { GetUserCart, AddItemToCart, UpdateCartItem, RemoveCartItem, ClearUserCart } = require('../services/cart-services');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

// Get the user's cart
router.get('/', GetUserCart);

// Add an item to the cart
router.post('/add', AddItemToCart);

// Update cart item quantity
router.put('/update', UpdateCartItem);

// Remove an item from the cart
router.delete('/remove/:productId', RemoveCartItem);

// Clear the entire cart
router.delete('/clear', ClearUserCart);

module.exports = router; 