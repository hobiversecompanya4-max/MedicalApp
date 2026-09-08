import OrderStatusHistory from "../models/OrderStatusHistory.js";
import Order from "../models/Order.js";
import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer.userId", "name phone email")
      .populate("prescription.prescriptionId")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "Orders fetched successfully",
      orders
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
    })
      .populate("customer.userId", "name phone email")
      .populate("prescription.prescriptionId");

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    const statusHistory = await OrderStatusHistory.find({
      orderId: order._id,
    })
      .populate("changedBy", "name email role")
      .sort({ createdAt: 1 });

    return successResponse(
      res,
      200,
      "Order details fetched successfully",
      {
        order,
        statusHistory,
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, note = "" } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return errorResponse(res, 400, "Invalid order status");
    }

    const order = await Order.findOne({
      orderId: req.params.orderId,
    });

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    order.orderStatus = status;

    await order.save();

    const OrderStatusHistory = (
      await import("../models/OrderStatusHistory.js")
    ).default;

    await OrderStatusHistory.create({
      orderId: order._id,
      status,
      changedBy: req.admin._id,
      note: note.trim(),
    });

    return successResponse(
      res,
      200,
      "Order status updated successfully",
      order
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("orderId")
      .populate("uploadedBy", "name phone email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "Prescriptions fetched successfully",
      prescriptions
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const reviewPrescription = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return errorResponse(
        res,
        400,
        "Invalid prescription status"
      );
    }

    const prescription = await Prescription.findById(
      req.params.prescriptionId
    );

    if (!prescription) {
      return errorResponse(
        res,
        404,
        "Prescription not found"
      );
    }

    prescription.status = status;
    prescription.reviewedBy = req.admin._id;
    prescription.reviewedAt = new Date();

    await prescription.save();

    if (prescription.orderId) {
      const order = await Order.findById(
        prescription.orderId
      );

      if (order) {
        let newOrderStatus = null;

        if (status === "Approved") {
          newOrderStatus = "Confirmed";
        }

        if (status === "Rejected") {
          newOrderStatus = "Cancelled";
        }

        if (newOrderStatus) {
          order.orderStatus = newOrderStatus;

          await order.save();

          await OrderStatusHistory.create({
            orderId: order._id,
            status: newOrderStatus,
            changedBy: req.admin._id,
            note:
              status === "Approved"
                ? "Prescription approved"
                : "Prescription rejected",
          });
        }
      }
    }

    return successResponse(
      res,
      200,
      "Prescription reviewed successfully",
      prescription
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      outForDeliveryOrders,
      deliveredOrders,
      cancelledOrders,
      revenueResult,
      totalPrescriptions,
      pendingPrescriptions,
      approvedPrescriptions,
      rejectedPrescriptions,
      totalMedicines,
      lowStockMedicines,
    ] = await Promise.all([
      Order.countDocuments(),

      Order.countDocuments({
        orderStatus: "Pending",
      }),

      Order.countDocuments({
        orderStatus: "Confirmed",
      }),

      Order.countDocuments({
        orderStatus: "Out for Delivery",
      }),

      Order.countDocuments({
        orderStatus: "Delivered",
      }),

      Order.countDocuments({
        orderStatus: "Cancelled",
      }),

      Order.aggregate([
        {
          $match: {
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$total",
            },
          },
        },
      ]),

      Prescription.countDocuments(),

      Prescription.countDocuments({
        status: "Pending",
      }),

      Prescription.countDocuments({
        status: "Approved",
      }),

      Prescription.countDocuments({
        status: "Rejected",
      }),

      Medicine.countDocuments({
        isActive: true,
      }),

      Medicine.countDocuments({
        isActive: true,
        stock: { $lte: 10 },
      }),
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    return successResponse(
      res,
      200,
      "Dashboard stats fetched successfully",
      {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          confirmed: confirmedOrders,
          outForDelivery: outForDeliveryOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
          totalRevenue,
        },

        prescriptions: {
          total: totalPrescriptions,
          pending: pendingPrescriptions,
          approved: approvedPrescriptions,
          rejected: rejectedPrescriptions,
        },

        medicines: {
          total: totalMedicines,
          lowStock: lowStockMedicines,
        },
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  getAllPrescriptions,
  reviewPrescription,
  getDashboardStats,
};