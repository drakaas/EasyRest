const { getOrCreateCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getCart } = require("../dao/cart-dao");

/**
 * Format cart data to include full image URLs
 * @param {Object} cart - Cart data from database
 * @returns {Object} - Formatted cart data
 */
const formatCartData = (cart) => {
    // Don't attempt to format if cart is not a proper object or contains an error message
    if (!cart || cart.message || !cart.items) return cart;
    
    // Format each cart item
    const formattedItems = cart.items.map(item => {
        // Skip if item doesn't have product or product doesn't have images
        if (!item.product || !item.product.images) return item;
        
        // Create a new object to avoid modifying the original
        const formattedProduct = { ...item.product._doc || item.product };
        
        // Format each image URL
        formattedProduct.images = formattedProduct.images.map(img => {
            // If image already starts with http, don't modify it
            if (img.startsWith('http')) return img;
            
            // Otherwise, prepend the server URL
            return `http://localhost:5000${img}`;
        });
        
        // Return the item with the formatted product
        return {
            ...item._doc || item,
            product: formattedProduct
        };
    });
    
    // Return the cart with formatted items
    return {
        ...cart._doc || cart,
        items: formattedItems
    };
};

const GetUserCart = async(req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available from authentication middleware
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const cart = await getCart(userId);
        if(cart.message) return res.status(404).send({ message: cart.message });
        
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(cart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        return res.status(500).send({ message: "erreur " + error });
    }
};

const AddItemToCart = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const { productId, quantity } = req.body;
        if (!productId) return res.status(400).send({ message: "Product ID is required" });
        
        const quantityToAdd = quantity || 1; // Default to 1 if not specified
        
        const updatedCart = await addToCart(userId, productId, quantityToAdd);
        if(updatedCart.message) return res.status(500).send({ message: updatedCart.message });
        
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        return res.status(500).send({ message: "erreur " + error });
    }
};

const UpdateCartItem = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const { productId, quantity } = req.body;
        if (!productId) return res.status(400).send({ message: "Product ID is required" });
        if (quantity === undefined) return res.status(400).send({ message: "Quantity is required" });
        
        const updatedCart = await updateCartItemQuantity(userId, productId, quantity);
        if(updatedCart.message) return res.status(500).send({ message: updatedCart.message });
        
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        return res.status(500).send({ message: "erreur " + error });
    }
};

const RemoveCartItem = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const productId = req.params.productId;
        if (!productId) return res.status(400).send({ message: "Product ID is required" });
        
        const updatedCart = await removeFromCart(userId, productId);
        if(updatedCart.message) return res.status(500).send({ message: updatedCart.message });
        
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        return res.status(500).send({ message: "erreur " + error });
    }
};

const ClearUserCart = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const emptyCart = await clearCart(userId);
        if(emptyCart.message) return res.status(500).send({ message: emptyCart.message });
        
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(emptyCart);
        
        return res.status(200).send({ message: "Cart cleared successfully", cart: formattedCart });
    } catch (error) {
        return res.status(500).send({ message: "erreur " + error });
    }
};

module.exports = {
    GetUserCart,
    AddItemToCart,
    UpdateCartItem,
    RemoveCartItem,
    ClearUserCart
};
