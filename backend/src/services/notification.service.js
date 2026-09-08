const sendOrderNotification = async ({
  phone,
  orderId,
  status,
}) => {
  console.log(
    `Order notification: ${orderId} -> ${status} -> ${phone}`
  );

  return {
    success: true,
    message: "Notification queued successfully",
  };
};

const sendPrescriptionNotification = async ({
  phone,
  prescriptionId,
  status,
}) => {
  console.log(
    `Prescription notification: ${prescriptionId} -> ${status} -> ${phone}`
  );

  return {
    success: true,
    message: "Notification queued successfully",
  };
};

export {
  sendOrderNotification,
  sendPrescriptionNotification,
};