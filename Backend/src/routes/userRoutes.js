import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas para usuarios
router.get("/me", authMiddleware, userController.getMe); // Información del usuario
router.put("/me", authMiddleware, userController.updateMe); // Actualizar usuario
router.delete("/me", authMiddleware, userController.deleteMe); // Eliminar usuario

export default router;
