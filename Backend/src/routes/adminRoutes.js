import express from "express";
import orderController from "../controllers/orderController.js";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Rutas de administración de órdenes
router.get("/orders", authMiddleware, adminMiddleware, orderController.findAll);
router.get("/orders/:id", authMiddleware, adminMiddleware, orderController.findOne);

// Rutas de administración de productos
router.get("/products", authMiddleware, adminMiddleware, productController.findAll);
router.post("/products", authMiddleware, adminMiddleware, productController.create);
router.put("/products/:id", authMiddleware, adminMiddleware, productController.update);
router.delete("/products/:id", authMiddleware, adminMiddleware, productController.remove);

export default router;
