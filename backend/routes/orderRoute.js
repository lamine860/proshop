import express from "express";
import { protectMiddleware } from "../middleware/AuthMiddleware.js";
import {
  placeOrder,
  orderDetails,
  updateOrderToPaid,
} from "./../controllers/orderController.js";

const router = express.Router();

router.post("/", protectMiddleware, placeOrder);
router.get("/:orderId", protectMiddleware, orderDetails);
router.put("/:orderId/pay", protectMiddleware, updateOrderToPaid);

export default router;
