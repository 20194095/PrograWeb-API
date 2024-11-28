import orderRepository from '../repositories/orderRepository.js';

export const getOrdersByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  const orders = orderRepository.findAllByUserId(userId);
  res.status(200).json(orders);
};

export const createOrder = (req, res) => {
  const order = req.body;
  const newOrder = orderRepository.createOrder(order);
  res.status(201).json(newOrder);
};

export const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);
  const order = orderRepository.findOne(id);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Orden no encontrada" });
  }
};
