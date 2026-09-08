import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@medicalstore.com";
    const password = "Admin@12345";

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      name: "Medical Store Admin",
      email,
      passwordHash,
      role: "superadmin",
      isActive: true,
    });

    console.log("Admin created successfully");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);

    await mongoose.disconnect().catch(() => {});

    process.exit(1);
  }
};

createAdmin();