import cartRepository from "../repositories/cartRepository.js";

const getCart = async (req, res) => {
    try {
        const cart = await cartRepository.getCartByUserId(req.user.id);
        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getCart:", error);
        return res.status(500).json({ message: "Error retrieving cart." });
    }
};

const addProduct = async (req, res) => {
    const { productId, cantidad } = req.body;

    try {
        const cartItem = await cartRepository.addProduct(req.user.id, productId, cantidad);
        return res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: "Error adding product to cart." });
    }
};

const updateQuantity = async (req, res) => {
    const { cantidad } = req.body;

    try {
        const updatedCartItem = await cartRepository.updateQuantity(
            req.user.id,
            req.params.productId,
            cantidad
        );
        return res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error("Error in updateQuantity:", error);
        return res.status(500).json({ message: "Error updating cart quantity." });
    }
};

const removeProduct = async (req, res) => {
    try {
        await cartRepository.removeProduct(req.user.id, req.params.productId);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in removeProduct:", error);
        return res.status(500).json({ message: "Error removing product from cart." });
    }
};

const clearCart = async (req, res) => {
    try {
        await cartRepository.clearCart(req.user.id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in clearCart:", error);
        return res.status(500).json({ message: "Error clearing cart." });
    }
};

export default { getCart, addProduct, updateQuantity, removeProduct, clearCart };
