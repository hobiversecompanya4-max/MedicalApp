const validateRegister = (req, res, next) => {
  const { name, phone, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  if (!/^[0-9]{10}$/.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits",
    });
  }

  if (password !== undefined && password !== null && password !== "") {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !phone.trim()) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  if (!/^[0-9]{10}$/.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  next();
};

const validateAdminLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Admin email is required",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Valid admin email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Admin password is required",
    });
  }

  next();
};

export {
  validateRegister,
  validateLogin,
  validateAdminLogin,
};