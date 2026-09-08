import express from "express";

import {
  createCustomerOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";

import protect from "../middleware/auth.middleware.js";
import uploadPrescription from "../middleware/upload.middleware.js";
import validateOrder from "../validators/order.validator.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Order routes are working",
  });
});

router.post(
  "/",
  protect,
  uploadPrescription.single("prescription"),
  validateOrder,
  createCustomerOrder
);

router.get("/my-orders", protect, getMyOrders);

router.get("/track/:orderId", protect, getOrderById);

export default router;