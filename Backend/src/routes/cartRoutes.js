import express from 'express';
import { getCartByUserId, addProduct, updateProduct, removeProduct } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCartByUserId);
router.post('/:userId', addProduct);
router.put('/:userId', updateProduct);
router.delete('/:userId/:productId', removeProduct);

export default router;
