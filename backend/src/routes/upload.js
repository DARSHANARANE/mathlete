import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import ResultFile from "../models/ResultFile.js";
import { fileURLToPath } from "url";

const router = express.Router();

// =====================
// STORAGE CONFIG
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

   const uploadDir = path.join(process.cwd(), "uploads", "result");

    // ✅ safe folder creation
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// =====================
// FILE FILTER (ONLY EXCEL)
// =====================
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only Excel files are allowed"));
    }

    cb(null, true);
  },
});

// =====================
// POST /upload
// =====================
router.post("/", upload.single("file"), async (req, res) => {
  try {
    let { year, className, heading } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!year || !className) {
      return res.status(400).json({ error: "Year and Class are required" });
    }

    // ✅ normalize className
    className = className.replace(/(st|nd|rd|th)/g, "");

    const filePath = `/uploads/result/${file.filename}`;

    // =====================
    // CHECK EXISTING
    // =====================
    const existing = await ResultFile.findOne({ year, className });

    if (existing) {
      // delete old file
      if (existing.filePath) {
        const oldPath = path.join(process.cwd(), existing.filePath);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      existing.fileName = file.originalname;
      existing.filePath = filePath;
      existing.heading = heading;
      existing.uploadedAt = new Date();

      await existing.save();

      return res.json({
        message: "File replaced successfully",
        data: existing,
      });
    }

    // =====================
    // CREATE NEW
    // =====================
    const saved = await ResultFile.create({
      fileName: file.originalname,
      filePath,
      year,
      className,
      heading,
      uploadedAt: new Date(),
    });

    return res.json({
      message: "File uploaded successfully",
      data: saved,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
});

export default router;