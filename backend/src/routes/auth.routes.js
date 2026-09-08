import express from "express";

import {
  registerUser,
  loginUser,
  loginAdmin,
} from "../controllers/auth.controller.js";

import {
  validateRegister,
  validateLogin,
  validateAdminLogin,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  registerUser
);

router.post(
  "/login",
  validateLogin,
  loginUser
);

router.post(
  "/admin/login",
  validateAdminLogin,
  loginAdmin
);

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth routes are working",
  });
});

export default router;