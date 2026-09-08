import Prescription from "../models/Prescription.js";
import Order from "../models/Order.js";

const createPrescription = async ({
  orderId,
  uploadedBy = null,
  file,
}) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const prescription = await Prescription.create({
    orderId,
    uploadedBy,
    file,
    status: "Pending",
  });

  order.prescription.required = true;
  order.prescription.prescriptionId = prescription._id;

  await order.save();

  return prescription;
};

const getPrescriptionById = async (prescriptionId) => {
  const prescription = await Prescription.findById(
    prescriptionId
  )
    .populate("orderId")
    .populate("uploadedBy", "name phone email")
    .populate("reviewedBy", "name email");

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  return prescription;
};

export {
  createPrescription,
  getPrescriptionById,
};