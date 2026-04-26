import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import ResultFile from "../models/ResultFile.js";

const router = express.Router();

// =====================
// STORAGE CONFIG
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     const uploadDir = path.join(process.cwd(), "uploads", "result");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

    // 🔥 normalize className (avoid "1st" vs "1")
    className = className.replace(/(st|nd|rd|th)/, "");

    // 🔥 relative path (cleaner for frontend use)
    const filePath = `/uploads/result/${file.filename}`;

    // =====================
    // CHECK EXISTING (year + class)
    // =====================
    const existing = await ResultFile.findOne({ year, className });

    if (existing) {
      // 🔥 delete old file from disk
      if (existing.filePath) {
        const oldPath = path.join(process.cwd(), existing.filePath);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // 🔥 update existing record
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
    return res.status(500).json({ error: "Upload failed" });
  }
});


export default router;