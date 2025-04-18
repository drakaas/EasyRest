const Cart = require('../models/Cart');
const mongoose = require('mongoose');

const getOrCreateCart = async (userId) => {
    try {
        let cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            select: 'name price images'
        });
        
        if (!cart) {
            // Create a new cart if one doesn't exist
            cart = new Cart({
                user: userId,
                items: []
            });
            await cart.save();
        }
        
        return cart;
    } catch (error) {
        return { message: "error " + error.message };
    }
};

const addToCart = async (userId, productId, quantity = 1) => {
    try {
        const cart = await getOrCreateCart(userId);
        
        // Check if cart retrieval had an error
        if (cart.message) return cart;
        
        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product._id.toString() === productId
        );
        
        if (existingItemIndex >= 0) {
            // If product exists, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If product doesn't exist, add it to the cart
            cart.items.push({
                product: productId,
                quantity
            });
        }
        
        // Save and return the updated cart
        await cart.save();
        
        // Return the cart with populated product details
        return await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name price images'
        });
    } catch (error) {
        return { message: "error " + error.message };
    }
};

const updateCartItemQuantity = async (userId, productId, quantity) => {
    try {
        if (quantity <= 0) {
            return removeFromCart(userId, productId);
        }
        
        const cart = await getOrCreateCart(userId);
        
        // Check if cart retrieval had an error
        if (cart.message) return cart;
        
        const existingItemIndex = cart.items.findIndex(
            item => item.product._id.toString() === productId
        );
        
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity = quantity;
        } else {
            return { message: "Item not found in cart" };
        }
        
        await cart.save();
        
        return await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name price images'
        });
    } catch (error) {
        return { message: "error " + error.message };
    }
};

const removeFromCart = async (userId, productId) => {
    try {
        const cart = await getOrCreateCart(userId);
        
        // Check if cart retrieval had an error
        if (cart.message) return cart;
        
        // Filter out the item to remove
        cart.items = cart.items.filter(
            item => item.product._id.toString() !== productId
        );
        
        await cart.save();
        
        return await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name price images'
        });
    } catch (error) {
        return { message: "error " + error.message };
    }
};

const clearCart = async (userId) => {
    try {
        const cart = await getOrCreateCart(userId);
        
        // Check if cart retrieval had an error
        if (cart.message) return cart;
        
        cart.items = [];
        await cart.save();
        
        return cart;
    } catch (error) {
        return { message: "error " + error.message };
    }
};

const getCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            select: 'name price images'
        });
        
        if (!cart) return { message: "No cart found for this user" };
        
        return cart;
    } catch (error) {
        return { message: "error " + error.message };
    }
};

module.exports = {
    getOrCreateCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCart
};
