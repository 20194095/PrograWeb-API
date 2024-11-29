import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas para gestionar el carrito de compras
router.get("/", authMiddleware, cartController.getCart); // Obtiene el carrito del usuario
router.post("/", authMiddleware, cartController.addProduct); // Agrega un producto al carrito
router.put("/:productId", authMiddleware, cartController.updateQuantity); // Actualiza la cantidad de un producto en el carrito
router.delete("/:productId", authMiddleware, cartController.removeProduct); // Elimina un producto del carrito
router.delete("/", authMiddleware, cartController.clearCart); // Vacía el carrito

export default router;
