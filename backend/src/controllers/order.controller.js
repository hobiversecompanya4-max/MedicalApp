import fs from "fs/promises";

import Order from "../models/Order.js";
import OrderStatusHistory from "../models/OrderStatusHistory.js";

import createOrder from "../services/order.service.js";
import { uploadFile } from "../services/upload.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const createCustomerOrder = async (req, res) => {
  try {
    let {
      name,
      phone,
      alternatePhone,
      deliveryAddress,
      medicines,
      prescriptionRequired,
      paymentMethod,
      notes,
    } = req.body;

    if (typeof deliveryAddress === "string") {
      deliveryAddress = JSON.parse(deliveryAddress);
    }

    if (typeof medicines === "string") {
      medicines = JSON.parse(medicines);
    }

    if (typeof prescriptionRequired === "string") {
      prescriptionRequired =
        prescriptionRequired === "true";
    }

    if (!Array.isArray(medicines)) {
      medicines = [];
    }

    let prescriptionFile = null;

    if (req.file) {
      prescriptionFile = await uploadFile(req.file);

      await fs.unlink(req.file.path).catch(() => {});
    }

    const order = await createOrder({
      userId: req.user?._id || null,

      customer: {
        name,
        phone,
        alternatePhone,
      },

      deliveryAddress,

      medicines,

      prescriptionFile,

      prescriptionRequired: Boolean(
        prescriptionRequired
      ),

      paymentMethod: paymentMethod || "COD",

      notes,
    });

    return successResponse(
      res,
      201,
      "Order created successfully",
      order
    );
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    return errorResponse(res, 500, error.message);
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "customer.userId": req.user._id,
    }).sort({ createdAt: -1 });

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

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { phone } = req.query;

    const order = await Order.findOne({
      orderId,
    }).populate("prescription.prescriptionId");

    if (!order) {
      return errorResponse(
        res,
        404,
        "Order not found"
      );
    }

    const isOwner =
      req.user &&
      order.customer.userId &&
      order.customer.userId.toString() ===
        req.user._id.toString();

    const isGuestOwner =
      !order.customer.userId &&
      phone &&
      order.customer.phone === phone.trim();

    if (!isOwner && !isGuestOwner) {
      return errorResponse(
        res,
        403,
        "Valid phone number is required to track this order"
      );
    }

    const statusHistory =
      await OrderStatusHistory.find({
        orderId: order._id,
      }).sort({ createdAt: 1 });

    return successResponse(
      res,
      200,
      "Order fetched successfully",
      {
        order,
        statusHistory,
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export {
  createCustomerOrder,
  getMyOrders,
  getOrderById,
};