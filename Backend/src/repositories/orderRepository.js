import orders from '../models/order.js';

let orderData = [...orders];

const findAllByUserId = (userId) => {
  return orderData.filter(order => order.userId === userId);
};

const createOrder = (order) => {
  order.id = orderData.length + 1;
  orderData.push(order);
  return order;
};

const findOne = (id) => {
  return orderData.find(order => order.id === id);
};

export default { findAllByUserId, createOrder, findOne };
