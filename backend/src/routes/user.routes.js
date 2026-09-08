import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getMyProfile);

router.patch("/profile", updateMyProfile);

export default router;