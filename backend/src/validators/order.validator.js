const validateOrder = (req, res, next) => {
    let {
      name,
      phone,
      alternatePhone,
      deliveryAddress,
      medicines,
      prescriptionRequired,
    } = req.body;

    if (typeof deliveryAddress === "string") {
      try {
        deliveryAddress = JSON.parse(deliveryAddress);
        req.body.deliveryAddress = deliveryAddress;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid delivery address format",
        });
      }
    }

    if (typeof medicines === "string") {
      try {
        medicines = JSON.parse(medicines);
        req.body.medicines = medicines;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid medicines format",
        });
      }
    }

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Customer name is required",
    });
  }

  if (!phone || !/^[0-9]{10}$/.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      message: "Valid 10-digit phone number is required",
    });
  }

  if (
    alternatePhone &&
    !/^[0-9]{10}$/.test(alternatePhone.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Alternate phone number must be 10 digits",
    });
  }

  if (!deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: "Delivery address is required",
    });
  }

  if (
    !deliveryAddress.addressLine ||
    !deliveryAddress.city ||
    !deliveryAddress.state ||
    !deliveryAddress.pincode
  ) {
    return res.status(400).json({
      success: false,
      message: "Complete delivery address is required",
    });
  }

  if (!/^[0-9]{6}$/.test(deliveryAddress.pincode)) {
    return res.status(400).json({
      success: false,
      message: "Pincode must be 6 digits",
    });
  }

  if (
    medicines &&
    (!Array.isArray(medicines) || medicines.length === 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Medicines must be a valid array",
    });
  }

  if (prescriptionRequired === true && !req.file) {
    return res.status(400).json({
      success: false,
      message: "Prescription file is required",
    });
  }

  next();
};

export default validateOrder;