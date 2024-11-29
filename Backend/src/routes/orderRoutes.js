import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas para órdenes
router.get("/", authMiddleware, orderController.findAll); // Todas las órdenes del usuario
router.get("/:id", authMiddleware, orderController.findOne); // Detalle de una orden específica
router.post("/", authMiddleware, orderController.create); // Crear una orden nueva

export default router;
