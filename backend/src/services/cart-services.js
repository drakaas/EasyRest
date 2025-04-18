const { getOrCreateCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getCart } = require("../dao/cart-dao");

/**
 * Format cart data to include full image URLs
 * @param {Object} cart - Cart data from database
 * @returns {Object} - Formatted cart data
 */
const formatCartData = (cart) => {
    console.log("[formatCartData] Input cart:", cart);
    
    // Don't attempt to format if cart is not a proper object or contains an error message
    if (!cart || cart.message || !cart.items) {
        console.log("[formatCartData] Invalid cart data, returning as is");
        return cart;
    }
    
    // Format each cart item
    const formattedItems = cart.items.map(item => {
        console.log("[formatCartData] Processing item:", item);
        
        // Skip if item doesn't have product or product doesn't have images
        if (!item.product || !item.product.images) {
            console.log("[formatCartData] Item missing product or images:", item);
            return item;
        }
        
        // Create a new object to avoid modifying the original
        const formattedProduct = { ...item.product._doc || item.product };
        
        // Format each image URL
        formattedProduct.images = formattedProduct.images.map(img => {
            // If image already starts with http, don't modify it
            if (img.startsWith('http')) return img;
            
            // Otherwise, prepend the server URL
            return `http://localhost:5000${img}`;
        });
        
        console.log("[formatCartData] Formatted product:", formattedProduct);
        
        // Return the item with the formatted product
        return {
            ...item._doc || item,
            product: formattedProduct
        };
    });
    
    console.log("[formatCartData] All formatted items:", formattedItems);
    
    // Return the cart with formatted items
    const formattedCart = {
        ...cart._doc || cart,
        items: formattedItems
    };
    
    console.log("[formatCartData] Final formatted cart:", {
        _id: formattedCart._id,
        user: formattedCart.user,
        itemCount: formattedCart.items.length
    });
    
    return formattedCart;
};

const GetUserCart = async(req, res) => {
    try {
        console.log("[GetUserCart] Request received, user:", req.user);
        const userId = req.user.id; // Assuming the user ID is available from authentication middleware
        if (!userId) {
            console.log("[GetUserCart] No user ID in request");
            return res.status(401).send({ message: "User authentication required" });
        }
        
        console.log("[GetUserCart] Fetching cart for user:", userId);
        const cart = await getCart(userId);
        if(cart.message) {
            console.log("[GetUserCart] Error from DAO:", cart.message);
            return res.status(404).send({ message: cart.message });
        }
        
        console.log("[GetUserCart] Cart retrieved successfully, items count:", cart.items?.length);
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(cart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        console.error("[GetUserCart] Exception:", error);
        return res.status(500).send({ message: "erreur " + error });
    }
};

const AddItemToCart = async(req, res) => {
    try {
        console.log("[AddItemToCart] Request received:", req.body);
        const userId = req.user.id;
        if (!userId) {
            console.log("[AddItemToCart] No user ID in request");
            return res.status(401).send({ message: "User authentication required" });
        }
        
        const { productId, quantity } = req.body;
        if (!productId) {
            console.log("[AddItemToCart] No productId in request body");
            return res.status(400).send({ message: "Product ID is required" });
        }
        
        const quantityToAdd = quantity || 1; // Default to 1 if not specified
        console.log(`[AddItemToCart] Adding product ${productId} with quantity ${quantityToAdd} for user ${userId}`);
        
        const updatedCart = await addToCart(userId, productId, quantityToAdd);
        if(updatedCart.message) {
            console.log("[AddItemToCart] Error from DAO:", updatedCart.message);
            return res.status(500).send({ message: updatedCart.message });
        }
        
        console.log("[AddItemToCart] Item added successfully, items count:", updatedCart.items?.length);
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        console.error("[AddItemToCart] Exception:", error);
        return res.status(500).send({ message: "erreur " + error });
    }
};

const UpdateCartItem = async(req, res) => {
    try {
        console.log("[UpdateCartItem] Request received:", req.body);
        const userId = req.user.id;
        if (!userId) {
            console.log("[UpdateCartItem] No user ID in request");
            return res.status(401).send({ message: "User authentication required" });
        }
        
        const { productId, quantity } = req.body;
        if (!productId) {
            console.log("[UpdateCartItem] No productId in request body");
            return res.status(400).send({ message: "Product ID is required" });
        }
        if (quantity === undefined) {
            console.log("[UpdateCartItem] No quantity in request body");
            return res.status(400).send({ message: "Quantity is required" });
        }
        
        console.log(`[UpdateCartItem] Updating product ${productId} to quantity ${quantity} for user ${userId}`);
        const updatedCart = await updateCartItemQuantity(userId, productId, quantity);
        if(updatedCart.message) {
            console.log("[UpdateCartItem] Error from DAO:", updatedCart.message);
            return res.status(500).send({ message: updatedCart.message });
        }
        
        console.log("[UpdateCartItem] Item updated successfully, items count:", updatedCart.items?.length);
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        console.error("[UpdateCartItem] Exception:", error);
        return res.status(500).send({ message: "erreur " + error });
    }
};

const RemoveCartItem = async(req, res) => {
    try {
        console.log("[RemoveCartItem] Request received, params:", req.params);
        const userId = req.user.id;
        if (!userId) {
            console.log("[RemoveCartItem] No user ID in request");
            return res.status(401).send({ message: "User authentication required" });
        }
        
        const productId = req.params.productId;
        if (!productId) {
            console.log("[RemoveCartItem] No productId in request params");
            return res.status(400).send({ message: "Product ID is required" });
        }
        
        console.log(`[RemoveCartItem] Removing product ${productId} for user ${userId}`);
        const updatedCart = await removeFromCart(userId, productId);
        if(updatedCart.message) {
            console.log("[RemoveCartItem] Error from DAO:", updatedCart.message);
            return res.status(500).send({ message: updatedCart.message });
        }
        
        console.log("[RemoveCartItem] Item removed successfully, items count:", updatedCart.items?.length);
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(updatedCart);
        
        return res.status(200).send(formattedCart);
    } catch (error) {
        console.error("[RemoveCartItem] Exception:", error);
        return res.status(500).send({ message: "erreur " + error });
    }
};

const ClearUserCart = async(req, res) => {
    try {
        console.log("[ClearUserCart] Request received");
        const userId = req.user.id;
        if (!userId) {
            console.log("[ClearUserCart] No user ID in request");
            return res.status(401).send({ message: "User authentication required" });
        }
        
        console.log(`[ClearUserCart] Clearing cart for user ${userId}`);
        const emptyCart = await clearCart(userId);
        if(emptyCart.message) {
            console.log("[ClearUserCart] Error from DAO:", emptyCart.message);
            return res.status(500).send({ message: emptyCart.message });
        }
        
        console.log("[ClearUserCart] Cart cleared successfully");
        // Format cart data to include full image URLs
        const formattedCart = formatCartData(emptyCart);
        
        return res.status(200).send({ message: "Cart cleared successfully", cart: formattedCart });
    } catch (error) {
        console.error("[ClearUserCart] Exception:", error);
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
