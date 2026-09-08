import User from "../models/User.js";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(
      res,
      200,
      "Profile fetched successfully",
      user
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (email !== undefined) {
      user.email = email.trim().toLowerCase() || null;
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).select(
      "-password"
    );

    return successResponse(
      res,
      200,
      "Profile updated successfully",
      updatedUser
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export { getMyProfile, updateMyProfile };