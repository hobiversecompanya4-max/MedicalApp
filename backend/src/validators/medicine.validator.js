const validateMedicine = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Medicine name is required",
    });
  }

  if (price === undefined || price === null || price === "") {
    return res.status(400).json({
      success: false,
      message: "Medicine price is required",
    });
  }

  if (Number.isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Medicine price must be a valid positive number",
    });
  }

  if (stock === undefined || stock === null || stock === "") {
    return res.status(400).json({
      success: false,
      message: "Medicine stock is required",
    });
  }

  if (Number.isNaN(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({
      success: false,
      message: "Medicine stock must be a valid non-negative number",
    });
  }

  next();
};

export default validateMedicine;