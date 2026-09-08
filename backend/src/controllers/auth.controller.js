import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return errorResponse(
        res,
        409,
        "User with this phone number already exists"
      );
    }

    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const user = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user._id,
      type: "user",
    });

    return successResponse(res, 201, "User registered successfully", {
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return errorResponse(res, 401, "Invalid phone number or password");
    }

    if (!user.password) {
      return errorResponse(
        res,
        400,
        "Password login is not enabled for this account"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid phone number or password");
    }

    const token = generateToken({
      id: user._id,
      type: "user",
    });

    return successResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email?.toLowerCase() });

    if (!admin) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    if (!admin.isActive) {
      return errorResponse(res, 403, "Admin account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken({
      id: admin._id,
      type: "admin",
      role: admin.role,
    });

    return successResponse(res, 200, "Admin login successful", {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export {
  registerUser,
  loginUser,
  loginAdmin,
};