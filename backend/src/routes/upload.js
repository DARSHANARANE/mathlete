// routes/uploadRoutes.js

import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js";

const router = express.Router();

// ======================
// RESULT STORAGE
// ======================

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "student-management/results",
      resource_type: "raw",
      format: file.originalname.split(".").pop(),

      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// ======================
// PDF STORAGE
// ======================

const pdfStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "student-management/pdfs",
      resource_type: "raw",
      format: "pdf",

      public_id: `${Date.now()}-${file.originalname.replace(
        /\.[^/.]+$/,
        ""
      )}`,
    };
  },
});

// ======================
// RESULT MULTER
// ======================

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only Excel files allowed"));
    }

    cb(null, true);
  },
});

// ======================
// PDF MULTER
// ======================

const uploadPdfMiddleware = multer({
  storage: pdfStorage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }

    cb(null, true);
  },
});

// ======================
// HANDLE RESULT UPLOAD
// ======================

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);

      return res.status(500).json({
        error: err.message || "Upload failed",
      });
    }

    next();
  });
};

// ======================
// HANDLE PDF UPLOAD
// ======================

const handlePdfUpload = (req, res, next) => {
  uploadPdfMiddleware.single("file")(req, res, (err) => {
    if (err) {
      console.error("PDF UPLOAD ERROR:", err);

      return res.status(500).json({
        error: err.message || "PDF upload failed",
      });
    }

    next();
  });
};

// ======================
// RESULT UPLOAD
// ======================

router.post("/", handleUpload, async (req, res) => {
  try {
    let { year, className, heading } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    className = className.replace(
      /(st|nd|rd|th)/g,
      ""
    );

    console.log("RESULT FILE:", file);
    console.log("PUBLIC ID:", file.filename);

    const existing = await ResultFile.findOne({
      year,
      className,
    });

    // =========================
    // DELETE OLD FILE
    // =========================
    if (existing?.publicId) {
      console.log(
        "Deleting OLD Result File:",
        existing.publicId
      );

      const cloudinaryResult =
        await cloudinary.uploader.destroy(
          existing.publicId,
          {
            resource_type: "raw",
            invalidate: true,
          }
        );

      console.log(
        "Cloudinary Delete Result:",
        cloudinaryResult
      );
    }

    // =========================
    // UPDATE EXISTING
    // =========================
    if (existing) {
      existing.fileName = file.originalname;

      existing.filePath = file.path;

      // IMPORTANT
      existing.publicId = file.filename;

      existing.heading = heading;

      existing.uploadedAt = new Date();

      await existing.save();

      return res.json({
        message: "Result replaced successfully",
        data: existing,
      });
    }

    // =========================
    // CREATE NEW
    // =========================
    const saved = await ResultFile.create({
      fileName: file.originalname,

      filePath: file.path,

      // IMPORTANT
      publicId: file.filename,

      year,

      className,

      heading,

      uploadedAt: new Date(),
    });

    res.json({
      message: "Result uploaded successfully",
      data: saved,
    });
  } catch (err) {
    console.error("RESULT UPLOAD ERROR:");
    console.error(err);

    res.status(500).json({
      error: err.message || "Upload failed",
    });
  }
});

// ======================
// DELETE RESULT FILE
// ======================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ResultFile.findById(id);

    if (!result) {
      return res.status(404).json({
        error: "Result file not found",
      });
    }

    // =========================
    // DELETE FROM CLOUDINARY
    // =========================
    if (result.publicId) {
      console.log(
        "Deleting Result File:",
        result.publicId
      );

      const cloudinaryResult =
        await cloudinary.uploader.destroy(
          result.publicId,
          {
            resource_type: "raw",
            invalidate: true,
          }
        );

      console.log(
        "Cloudinary Result Delete:",
        cloudinaryResult
      );
    }

    // =========================
    // DELETE FROM DB
    // =========================
    await ResultFile.findByIdAndDelete(id);

    res.json({
      message: "Result file deleted successfully",
    });
  } catch (err) {
    console.error("RESULT DELETE ERROR:");
    console.error(err);

    res.status(500).json({
      error: err.message || "Delete failed",
    });
  }
});

// ======================
// PDF UPLOAD
// ======================

router.post("/pdf", handlePdfUpload, async (req, res) => {
  try {
    const { title, className, year, pages, price } =
      req.body;

    const file = req.file;

    console.log("PDF FILE:", file);
    console.log("PDF PUBLIC ID:", file?.filename);

    if (!file) {
      return res.status(400).json({
        error: "No PDF uploaded",
      });
    }

    const saved = await Pdf.create({
      fileName: file.originalname,

      // cloudinary url
      filePath: file.path,

      // IMPORTANT
      publicId: file.filename,

      title,
      className,
      year,
      pages: pages ? Number(pages) : undefined,
      price: price ? Number(price) : undefined,
      uploadedAt: new Date(),
    });

    res.json({
      message: "PDF uploaded successfully",
      data: saved,
    });
  } catch (err) {
    console.error("PDF UPLOAD ERROR:", err);

    res.status(500).json({
      error: err.message || "PDF upload failed",
    });
  }
});

// ======================
// DELETE PDF
// ======================

router.delete("/pdf/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pdf = await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({
        error: "PDF not found",
      });
    }

    console.log("Deleting PDF:", pdf.publicId);

    // ======================
    // DELETE FROM CLOUDINARY
    // ======================

    if (pdf.publicId) {
      const deleted =
        await cloudinary.uploader.destroy(
          pdf.publicId,
          {
            resource_type: "raw",
          }
        );

      console.log(
        "Cloudinary PDF Delete:",
        deleted
      );
    }

    // ======================
    // DELETE FROM DATABASE
    // ======================

    await Pdf.findByIdAndDelete(id);

    res.json({
      message: "PDF deleted successfully",
    });
  } catch (err) {
    console.error("PDF DELETE ERROR:", err);

    res.status(500).json({
      error: err.message || "PDF delete failed",
    });
  }
});

// ======================
// UPDATE PDF
// ======================

router.put("/pdf/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, price } = req.body;

    const pdf = await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({
        error: "PDF not found",
      });
    }

    if (title !== undefined) {
      pdf.title = title;
    }

    if (price !== undefined) {
      pdf.price = Number(price);
    }

    await pdf.save();

    res.json({
      message: "PDF updated successfully",
      data: pdf,
    });
  } catch (err) {
    console.error("PDF UPDATE ERROR:", err);

    res.status(500).json({
      error: err.message || "PDF update failed",
    });
  }
});

export default router;