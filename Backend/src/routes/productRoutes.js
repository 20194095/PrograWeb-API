// productRoutes.js
import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"; // Si necesitas un middleware para validar administradores.

const router = express.Router();

router.get("/", productController.findAll);
router.get("/:id", productController.findOne);
router.post("/", authMiddleware, adminMiddleware, productController.create);
router.put("/:id", authMiddleware, adminMiddleware, productController.update);
router.delete("/:id", authMiddleware, adminMiddleware, productController.remove);

export default router;
