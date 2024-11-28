// cartRoutes.js
import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, cartController.addProduct);
router.put("/:productId", authMiddleware, cartController.updateQuantity);
router.delete("/:productId", authMiddleware, cartController.removeProduct);
router.delete("/", authMiddleware, cartController.clearCart);

export default router;
