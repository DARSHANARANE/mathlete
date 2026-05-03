import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as pdfParseModule from "pdf-parse";

import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js";

const pdfParse =
  typeof pdfParseModule === "function"
    ? pdfParseModule
    : pdfParseModule.default || pdfParseModule.pdfParse || pdfParseModule;


const router = express.Router();

// =====================
// EXCEL STORAGE
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "result");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
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

// =====================
// RESULT UPLOAD
// =====================
router.post("/", upload.single("file"), async (req, res) => {
  try {
    let { year, className, heading } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file" });
    }

    className = className.replace(/(st|nd|rd|th)/g, "");

    const filePath = `/uploads/result/${file.filename}`;

    const existing = await ResultFile.findOne({ year, className });

    if (existing) {
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
        message: "Replaced",
        data: existing,
      });
    }

    const saved = await ResultFile.create({
      fileName: file.originalname,
      filePath,
      year,
      className,
      heading,
      uploadedAt: new Date(),
    });

    res.json({
      message: "Uploaded",
      data: saved,
    });
  } catch (err) {
    console.error("RESULT UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// PDF STORAGE
// =====================
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "pdfs");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed"));
    }
  },
});

// =====================
// PDF UPLOAD
// =====================
router.post("/pdf", uploadPdf.single("file"), async (req, res) => {
  try {
    const { title, className, year, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No PDF" });
    }

    if (!price) {
      return res.status(400).json({ error: "Price required" });
    }

    let pages = 0;

    try {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      pages = data.numpages || 0;
    } catch (parseErr) {
      console.error("PDF PARSE ERROR:", parseErr);
    }

    const filePath = `/uploads/pdfs/${file.filename}`;

    const saved = await Pdf.create({
      fileName: file.originalname,
      filePath,
      title,
      className,
      year,
      pages,
      price,
      uploadedAt: new Date(),
    });

    res.json({
      message: "PDF uploaded successfully",
      data: saved,
    });
  } catch (err) {
    console.error("PDF UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// DELETE PDF
// =====================
router.delete("/pdf/:id", async (req, res) => {
  try {
    const file = await Pdf.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "PDF not found" });
    }

    if (file.filePath) {
      const fullPath = path.join(process.cwd(), file.filePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Pdf.findByIdAndDelete(req.params.id);

    res.json({
      message: "PDF deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// =====================
// UPDATE PDF
// =====================
router.put("/pdf/:id", async (req, res) => {
  try {
    const { title, price } = req.body;

    const updated = await Pdf.findByIdAndUpdate(
      req.params.id,
      { title, price },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "PDF not found" });
    }

    res.json({
      message: "PDF updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;