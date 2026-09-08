const adminOnly = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  const allowedRoles = ["admin", "superadmin", "pharmacist"];

  if (!allowedRoles.includes(req.admin.role)) {
    return res.status(403).json({
      success: false,
      message: "Insufficient admin permissions",
    });
  }

  next();
};

export default adminOnly;