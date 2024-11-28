import cartRepository from '../repositories/cartRepository.js';

export const getCartByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  const cart = cartRepository.findCartByUserId(userId);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
};

export const addProduct = (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;
  const cart = cartRepository.addProductToCart(userId, productId, quantity);
  res.status(201).json(cart);
};

export const updateProduct = (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;
  const cart = cartRepository.updateProductQuantity(userId, productId, quantity);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ error: "Producto no encontrado en el carrito" });
  }
};

export const removeProduct = (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  const cart = cartRepository.removeProductFromCart(userId, productId);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ error: "Producto no encontrado en el carrito" });
  }
};
