// routes/uploadRoutes.js

import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js";
import Order from "../models/Order.js";
import Book from "../models/Book.js";
import BookOrder from "../models/BookOrder.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import PDFDocument from "pdfkit";
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

      access_mode: "public",

      type: "upload",

      use_filename: true,

      unique_filename: true,

      public_id: `${Date.now()}-${file.originalname}`,
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
      filePath: file.path.replace("http://", "https://"),

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
// DOWNLOAD PAYMENT PDF
// ======================

router.get("/payment/download/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    const pdf = await Pdf.findById(order.pdfId);
    if (pdf?.publicId) {
      const downloadUrl = pdf.filePath.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );

      return res.redirect(downloadUrl);
    }

    if (!order.fileUrl) {
      return res.status(404).json({
        error: "No downloadable file found for this order",
      });
    }

    const fileUrl = order.fileUrl;
    const fileResponse = await fetch(fileUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "*/*",
      },
      redirect: "follow",
    });

    if (!fileResponse.ok) {
      console.error(
        "Cloudinary file fetch failed:",
        fileResponse.status,
        fileResponse.statusText
      );
      return res.status(502).json({
        error: "Failed to fetch file from storage",
      });
    }

    const fileName = fileUrl.split("/").pop()?.split("?")[0] || "download.pdf";
    const contentType = fileResponse.headers.get("content-type") || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    fileResponse.body.pipe(res);
  } catch (err) {
    console.error("DOWNLOAD ORDER ERROR:", err);

    res.status(500).json({
      error: err.message || "Download failed",
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

// ======================
// BOOK PAYMENT - CREATE ORDER (REST compatibility for frontend)
// ======================

router.post(
  "/book-payment/create-order",
  async (req, res) => {
    try {
      const { bookId, amount } = req.body;

      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const razorpayAmount = Math.round(Number(amount) * 100);

      const order = await razorpay.orders.create({
        amount: razorpayAmount,
        currency: "INR",
        payment_capture: 1,
      });

      res.json({
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        orderId: order.id,
      });
    } catch (err) {
      console.error("BOOK PAYMENT CREATE ORDER ERROR:", err);

      res.status(500).json({
        error: err.message || "Failed to create order",
      });
    }
  }
);

// ======================
// BOOK PAYMENT - VERIFY
// ======================

router.post("/book-payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookId,
      studentName,
      mobile,
      email,
      address,
      pincode,
      amount,
    } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found", invoiceUrl: null });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Razorpay signature", invoiceUrl: null });
    }

    const invoiceNumber = `INV-${Date.now()}`;

    const saved = await BookOrder.create({
      bookId,

      studentName,

      mobile,

      email,

      address,

      pincode,

      amount,

      invoiceNumber,

      razorpayOrderId:
        razorpay_order_id,

      razorpayPaymentId:
        razorpay_payment_id,

      status: "Paid",
    });

    res.json({
      success: true,

      message:
        "Payment verified successfully",

      order: {
        id: saved._id.toString(),

        studentName:
          saved.studentName,

        amount: saved.amount,

        createdAt:
          saved.createdAt,

        invoiceNumber:
          saved.invoiceNumber,

        razorpayOrderId:
          saved.razorpayOrderId,

        razorpayPaymentId:
          saved.razorpayPaymentId,
      },
    });
  } catch (err) {
    console.error("BOOK PAYMENT VERIFY ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Verification failed",
    });
  }
});

// ======================
// invoice - VERIFY
// ======================
router.get(
  "/invoice/:orderId",
  async (req, res) => {
    try {
      const order =
        await BookOrder.findById(
          req.params.orderId
        ).populate("bookId");

      if (!order) {
        return res
          .status(404)
          .json({
            error:
              "Order not found",
          });
      }

      const doc =
        new PDFDocument({
          margin: 50,
        });

      // ======================
      // HEADERS
      // ======================

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice-${order.invoiceNumber}.pdf`
      );

      doc.pipe(res);

      // ======================
      // TITLE
      // ======================

      doc
        .fontSize(24)
        .text("Invoice", {
          align: "center",
        });

      doc.moveDown(2);

      // ======================
      // ORDER DETAILS
      // ======================

      doc
        .fontSize(14)
        .text(
          `Invoice Number: ${order.invoiceNumber}`
        );

      doc.text(
        `Payment ID: ${order.razorpayPaymentId}`
      );

      doc.text(
        `Order ID: ${order.razorpayOrderId}`
      );

      const formattedDate =
        new Date(
          order.createdAt
        ).toLocaleDateString("en-GB");

      doc.text(
        `Date: ${formattedDate}`
      );

      doc.moveDown();

      // ======================
      // STUDENT DETAILS
      // ======================

      doc
        .fontSize(18)
        .text("Student Details");

      doc
        .fontSize(14)
        .text(
          `Name: ${order.studentName}`
        );

      doc.text(
        `Mobile: ${order.mobile}`
      );

      doc.text(
        `Email: ${order.email}`
      );

      doc.text(
        `Address: ${order.address}`
      );

      doc.text(
        `Pincode: ${order.pincode}`
      );

      doc.moveDown();

      // ======================
      // BOOK DETAILS
      // ======================

      doc
        .fontSize(18)
        .text("Book Details");

      doc
        .fontSize(14)
        .text(
          `Title: ${order.bookId.title}`
        );

      doc.text(
        `Class: ${order.bookId.className}`
      );

      doc.text(
        `Level: ${order.bookId.level}`
      );

      doc.text(
        `Price: ₹${order.amount}`
      );

      doc.moveDown(2);

      // ======================
      // FOOTER
      // ======================

      doc.text(
        "Thank you for your purchase.",
        {
          align: "center",
        }
      );

      doc.end();
    } catch (err) {
      console.error(
        "INVOICE ERROR:",
        err
      );

      res.status(500).json({
        error:
          "Failed to generate invoice",
      });
    }
  }
);


export default router;