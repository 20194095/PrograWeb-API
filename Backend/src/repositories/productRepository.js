import products from '../models/producto.js';

let productData = [...products];

const findAll = () => {
  return productData;
};

const findOne = (id) => {
  return productData.find(product => product.id === id);
};

const create = (product) => {
  product.id = productData.length + 1;
  productData.push(product);
  return product;
};

const update = (product) => {
  const index = productData.findIndex(p => p.id === product.id);
  if (index !== -1) {
    productData[index] = product;
    return true;
  }
  return false;
};

const remove = (id) => {
  const index = productData.findIndex(p => p.id === id);
  if (index !== -1) {
    productData.splice(index, 1);
    return true;
  }
  return false;
};

export default { findAll, findOne, create, update, remove };
