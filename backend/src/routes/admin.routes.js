import express from "express";

import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  getAllPrescriptions,
  reviewPrescription,
  getDashboardStats,
} from "../controllers/admin.controller.js";

import adminProtect from "../middleware/adminAuth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin routes are working",
  });
});

router.use(adminProtect, adminOnly);

router.get("/me", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin authenticated successfully",
    data: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

router.get("/dashboard", getDashboardStats);

router.get("/orders", getAllOrders);

router.get("/orders/:orderId", getOrderDetails);

router.patch(
  "/orders/:orderId/status",
  updateOrderStatus
);

router.get("/prescriptions", getAllPrescriptions);

router.patch(
  "/prescriptions/:prescriptionId/review",
  reviewPrescription
);

export default router;