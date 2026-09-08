import fs from "fs/promises";
import Medicine from "../models/Medicine.js";
import { uploadFile } from "../services/upload.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const createMedicine = async (req, res) => {
  try {
    let image = {
      url: "",
      publicId: null,
    };

    if (req.file) {
      const uploadedImage = await uploadFile(req.file);

      image = {
        url: uploadedImage.url,
        publicId: uploadedImage.publicId,
      };

      await fs.unlink(req.file.path).catch(() => {});
    }

    const medicine = await Medicine.create({
      name: req.body.name.trim(),
      genericName: req.body.genericName?.trim() || "",
      manufacturer: req.body.manufacturer?.trim() || "",
      category: req.body.category?.trim() || "",
      description: req.body.description?.trim() || "",
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image,
      prescriptionRequired:
        req.body.prescriptionRequired === true ||
        req.body.prescriptionRequired === "true",
    });

    return successResponse(
      res,
      201,
      "Medicine created successfully",
      medicine
    );
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    return errorResponse(res, 500, error.message);
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const itemsPerPage = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const filter = {
      isActive: true,
    };

    if (search?.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          genericName: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          manufacturer: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    if (category?.trim()) {
      filter.category = {
        $regex: `^${category.trim()}$`,
        $options: "i",
      };
    }

    const skip = (currentPage - 1) * itemsPerPage;

    const [medicines, total] = await Promise.all([
      Medicine.find(filter)
        .sort({ name: 1 })
        .skip(skip)
        .limit(itemsPerPage),

      Medicine.countDocuments(filter),
    ]);

    return successResponse(
      res,
      200,
      "Medicines fetched successfully",
      {
        medicines,
        pagination: {
          page: currentPage,
          limit: itemsPerPage,
          total,
          totalPages: Math.ceil(total / itemsPerPage),
        },
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!medicine) {
      return errorResponse(res, 404, "Medicine not found");
    }

    return successResponse(
      res,
      200,
      "Medicine fetched successfully",
      medicine
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return errorResponse(res, 404, "Medicine not found");
    }

    if (req.body.name !== undefined) {
      medicine.name = req.body.name.trim();
    }

    if (req.body.genericName !== undefined) {
      medicine.genericName = req.body.genericName.trim();
    }

    if (req.body.manufacturer !== undefined) {
      medicine.manufacturer = req.body.manufacturer.trim();
    }

    if (req.body.category !== undefined) {
      medicine.category = req.body.category.trim();
    }

    if (req.body.description !== undefined) {
      medicine.description = req.body.description.trim();
    }

    if (req.body.price !== undefined) {
      medicine.price = Number(req.body.price);
    }

    if (req.body.stock !== undefined) {
      medicine.stock = Number(req.body.stock);
    }

    if (req.body.prescriptionRequired !== undefined) {
      medicine.prescriptionRequired =
        req.body.prescriptionRequired === true ||
        req.body.prescriptionRequired === "true";
    }

    if (req.file) {
      const uploadedImage = await uploadFile(req.file);

      medicine.image = {
        url: uploadedImage.url,
        publicId: uploadedImage.publicId,
      };

      await fs.unlink(req.file.path).catch(() => {});
    }

    await medicine.save();

    return successResponse(
      res,
      200,
      "Medicine updated successfully",
      medicine
    );
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    return errorResponse(res, 500, error.message);
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );

    if (!medicine) {
      return errorResponse(res, 404, "Medicine not found");
    }

    return successResponse(
      res,
      200,
      "Medicine deleted successfully"
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};