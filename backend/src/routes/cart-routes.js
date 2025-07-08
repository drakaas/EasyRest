const express = require('express');
const { GetUserCart, AddItemToCart, UpdateCartItem, RemoveCartItem, ClearUserCart } = require('../services/cart-services');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

const router = express.Router();

// Remove global isLoggedIn middleware
// router.use(isLoggedIn);

// Get the user's cart (allow unauthenticated, return empty cart)
router.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ items: [] });
  }
  const token = authHeader.split(' ')[1];
  const jwt = require('jsonwebtoken');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const { GetUserCart } = require('../services/cart-services');
    return GetUserCart(req, res);
  } catch (err) {
    return res.json({ items: [] });
  }
});

// Add an item to the cart
router.post('/add', isLoggedIn, AddItemToCart);

// Update cart item quantity
router.put('/update', isLoggedIn, UpdateCartItem);

// Remove an item from the cart
router.delete('/remove/:productId', isLoggedIn, RemoveCartItem);

// Clear the entire cart
router.delete('/clear', isLoggedIn, ClearUserCart);

module.exports = router; 