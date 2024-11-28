// userRoutes.js
import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);
router.delete("/me", authMiddleware, userController.deleteMe);

export default router;
