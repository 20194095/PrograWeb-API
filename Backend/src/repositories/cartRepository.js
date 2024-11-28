import carts from '../models/cart.js';

let cartData = [...carts];

const findCartByUserId = (userId) => {
  return cartData.find(cart => cart.userId === userId);
};

const addProductToCart = (userId, productId, quantity) => {
  let cart = cartData.find(cart => cart.userId === userId);
  if (!cart) {
    cart = { id: cartData.length + 1, userId, products: [] };
    cartData.push(cart);
  }
  const existingProduct = cart.products.find(p => p.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }
  return cart;
};

const updateProductQuantity = (userId, productId, quantity) => {
  const cart = cartData.find(cart => cart.userId === userId);
  if (cart) {
    const product = cart.products.find(p => p.productId === productId);
    if (product) {
      product.quantity = quantity;
      return cart;
    }
  }
  return null;
};

const removeProductFromCart = (userId, productId) => {
  const cart = cartData.find(cart => cart.userId === userId);
  if (cart) {
    cart.products = cart.products.filter(p => p.productId !== productId);
    return cart;
  }
  return null;
};

export default { findCartByUserId, addProductToCart, updateProductQuantity, removeProductFromCart };
