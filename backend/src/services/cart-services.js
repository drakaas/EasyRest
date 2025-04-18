const { getOrCreateCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getCart } = require("../dao/cart-dao");

const GetUserCart = async(req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available from authentication middleware
        if (!userId) return res.status(401).send({ message: "User authentication required" });
        
        const cart = await getCart(userId);
        if(cart.message) return res.status(404).send({ message: cart.message });
        
        return res.status(200).send(cart);
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
        
        return res.status(200).send(updatedCart);
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
        
        return res.status(200).send(updatedCart);
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
        
        return res.status(200).send(updatedCart);
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
        
        return res.status(200).send({ message: "Cart cleared successfully", cart: emptyCart });
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
