// orderRoutes.js
import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, orderController.findAll);
router.get("/:id", authMiddleware, orderController.findOne);
router.post("/", authMiddleware, orderController.create);

export default router;
