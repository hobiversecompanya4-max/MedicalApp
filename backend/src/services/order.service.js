import Order from "../models/Order.js";
import Prescription from "../models/Prescription.js";
import OrderStatusHistory from "../models/OrderStatusHistory.js";
import generateOrderId from "../utils/generateOrderId.js";

const createOrder = async ({
  userId = null,
  customer,
  deliveryAddress,
  medicines = [],
  prescriptionFile = null,
  prescriptionRequired = false,
  paymentMethod = "COD",
  notes = "",
}) => {
  const subtotal = medicines.reduce(
    (total, medicine) =>
      total +
      Number(medicine.price) * Number(medicine.quantity),
    0
  );

  const deliveryFee = 0;

  const order = await Order.create({
    orderId: generateOrderId(),

    customer: {
      userId,
      name: customer.name,
      phone: customer.phone,
      alternatePhone: customer.alternatePhone || "",
    },

    deliveryAddress,

    medicines,

    prescription: {
      required: prescriptionRequired,
    },

    payment: {
      method: paymentMethod,
      status: "Pending",
    },

    orderStatus: "Pending",

    subtotal,

    deliveryFee,

    total: subtotal + deliveryFee,

    notes,
  });

  await OrderStatusHistory.create({
    orderId: order._id,
    status: "Pending",
    changedBy: null,
    note: "Order created",
  });

  if (prescriptionFile) {
    const prescription = await Prescription.create({
      orderId: order._id,
      uploadedBy: userId,
      file: prescriptionFile,
      status: "Pending",
    });

    order.prescription.prescriptionId = prescription._id;

    await order.save();
  }

  return order;
};

export default createOrder;