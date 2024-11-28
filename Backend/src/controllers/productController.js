import productRepository from '../repositories/productRepository.js';

export const getAllProducts = (req, res) => {
  const products = productRepository.findAll();
  res.status(200).json(products);
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = productRepository.findOne(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

export const createProduct = (req, res) => {
  const product = req.body;
  const newProduct = productRepository.create(product);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const product = req.body;
  const updated = productRepository.update(product);
  if (updated) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const removed = productRepository.remove(id);
  if (removed) {
    res.status(200).json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};
