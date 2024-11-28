import express from 'express';
import { getOrdersByUserId, createOrder, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:userId', getOrdersByUserId);
router.post('/', createOrder);
router.get('/:id', getOrderById);

export default router;
