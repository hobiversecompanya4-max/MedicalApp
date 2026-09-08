import mongoose from "mongoose";

const orderStatusHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      required: true,
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderStatusHistory = mongoose.model(
  "OrderStatusHistory",
  orderStatusHistorySchema
);

export default OrderStatusHistory;