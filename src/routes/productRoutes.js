import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Rutas de productos
router.get("/", productController.findAll); // Listar productos
router.get("/:id", productController.findOne); // Detalle de un producto
router.post("/", authMiddleware, adminMiddleware, productController.create); // Crear un nuevo producto
router.put("/:id", authMiddleware, adminMiddleware, productController.update); // Actualizar un producto
router.delete("/:id", authMiddleware, adminMiddleware, productController.remove); // Eliminar un producto

export default router;
