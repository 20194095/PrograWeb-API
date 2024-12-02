import cartRepository from "../repositories/cartRepository.js";

const getCart = async (req, res) => {
    try {
        const cart = await cartRepository.getCartByUserId(req.user.id);
        if (!cart) {
            console.log('Carrito no encontrado para el usuario:', req.user.id);
            return res.status(404).json({ message: 'Carrito no encontrado.' });
        }
        console.log('Carrito encontrado:', cart);
        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getCart:", error);
        return res.status(500).json({ message: "Error al recuperar el carrito." });
    }
};


const addProduct = async (req, res) => {
    const { productId, cantidad } = req.body;

    try {
        // Verificar si el carrito existe, de lo contrario crearlo
        let cart = await cartRepository.getCartByUserId(req.user.id);
        if (!cart) {
            cart = await cartRepository.createCart(req.user.id); // Crear un nuevo carrito
        }

        // Agregar producto al carrito
        const cartItem = await cartRepository.addProductToCart(cart.id, productId, cantidad);
        return res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: "Error al agregar el producto al carrito." });
    }
};

const updateQuantity = async (req, res) => {
    const { cantidad } = req.body;

    try {
        const cart = await cartRepository.getCartByUserId(req.user.id);
        if (!cart) return res.status(404).json({ message: "Carrito no encontrado." });

        const updatedCartItem = await cartRepository.updateQuantity(cart.id, req.params.productId, cantidad);
        return res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error("Error in updateQuantity:", error);
        return res.status(500).json({ message: "Error al actualizar la cantidad del carrito." });
    }
};

const removeProduct = async (req, res) => {
    try {
        const cart = await cartRepository.getCartByUserId(req.user.id);
        if (!cart) return res.status(404).json({ message: "Carrito no encontrado." });

        await cartRepository.removeProductFromCart(cart.id, req.params.productId);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in removeProduct:", error);
        return res.status(500).json({ message: "Error al eliminar el producto del carrito." });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await cartRepository.getCartByUserId(req.user.id);
        if (!cart) return res.status(404).json({ message: "Carrito no encontrado." });

        await cartRepository.clearCart(cart.id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in clearCart:", error);
        return res.status(500).json({ message: "Error al vaciar el carrito." });
    }
};

export default { getCart, addProduct, updateQuantity, removeProduct, clearCart };
