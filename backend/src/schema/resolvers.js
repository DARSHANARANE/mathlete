import bcrypt from "bcrypt";
import User from "../models/User.js";
import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js"; // ✅ NEW
import Order from "../models/Order.js"; // ✅ NEW
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import path from "path";

// ======================
// ADMIN CHECK
// ======================
const isAdmin = (user) => {
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
};

const resolvers = {
  Query: {
    hello: () => "Server is running 🚀",

    adminData: (_, __, { user }) => {
      isAdmin(user);
      return "Secret Admin Data 🔐";
    },

    // ✅ Get all result files (Admin panel)
    getResultFiles: async () => {
      const files = await ResultFile.find().sort({ uploadedAt: -1 });

      return files.map((file) => ({
        id: file._id.toString(),
        fileName: file.fileName,
        filePath: file.filePath,
        year: file.year,
        className: file.className,
        heading: file.heading,
        uploadedAt: file.uploadedAt,
      }));
    },

    // ✅ STEP 1: Get Years
    getYears: async () => {
      return await ResultFile.distinct("year");
    },

    // ✅ STEP 2: Get Classes by Year
    getClasses: async (_, { year }) => {
      const filter = {};
      if (year && year !== "all") {
        filter.year = year;
      }

      return await ResultFile.distinct("className", filter);
    },

    // ✅ STEP 3: Get File by Year + Class
    getResultFileByClass: async (_, { year, className }) => {
      const file = await ResultFile.findOne({ year, className });

      if (!file) return null;

      return {
        id: file._id.toString(),
        fileName: file.fileName,
        filePath: file.filePath,
        year: file.year,
        className: file.className,
        heading: file.heading,
        uploadedAt: file.uploadedAt,
      };
    },

    // =========================
    // ✅ NEW: GET ALL PDFS
    // =========================
    getPdfs: async () => {
      const pdfs = await Pdf.find().sort({ uploadedAt: -1 });

      return pdfs.map((file) => ({
        id: file._id.toString(),
        fileName: file.fileName,
        filePath: file.filePath,
        title: file.title,
        className: file.className,
        year: file.year,
        pages: file.pages,
        price: file.price,
        uploadedAt: file.uploadedAt,
      }));
    },

    // =========================
    // ✅ NEW: GET SINGLE PDF
    // =========================
    getPdf: async (_, { id }) => {
      const file = await Pdf.findById(id);
      if (!file) return null;

      return {
        id: file._id.toString(),
        ...file._doc,
      };
    },
  getOrders: async () => {
    const orders = await Order.find().sort({ createdAt: -1 });

    return orders.map((item) => ({
      id: item._id.toString(),
      amount: item.amount,
      razorpayOrderId: item.razorpayOrderId,
      razorpayPaymentId: item.razorpayPaymentId,
      createdAt: item.createdAt?.toISOString(),
      fileUrl: item.fileUrl,
      status: item.status,
    }));
  },
  },

  Mutation: {
    // ✅ LOGIN
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken(user);

      return { token, user };
    },

    // =========================
    // ✅ NEW: UPLOAD PDF (GRAPHQL)
    // =========================
    uploadPdf: async (
      _,
      { file, title, className, year, pages, price },
      { user }
    ) => {
      isAdmin(user); // 🔐 only admin

      const { createReadStream, filename } = await file;

      const stream = createReadStream();

      const uploadDir = "uploads/pdfs/";
      const filePath = `${uploadDir}${Date.now()}-${filename}`;

      // ensure folder exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // save file
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      const newPdf = new Pdf({
        fileName: filename,
        filePath,
        title,
        className,
        year,
        pages,
        price,
      });

      await newPdf.save();

      return {
        id: newPdf._id.toString(),
        ...newPdf._doc,
      };
    },

    // =========================
    // ✅ DELETE RESULT FILE
    // =========================
    deleteResultFile: async (_, { id }) => {
      const file = await ResultFile.findById(id);

      if (!file) {
        throw new Error("File not found");
      }

      if (file.filePath) {
        const fullPath = path.join(process.cwd(), file.filePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log("File deleted:", fullPath);
        }
      }

      await ResultFile.findByIdAndDelete(id);

      return true;
    },

    // =========================
    // ✅ NEW: DELETE PDF
    // =========================
    deletePdf: async (_, { id }, { user }) => {
      isAdmin(user);

      const file = await Pdf.findById(id);

      if (!file) throw new Error("PDF not found");

      if (file.filePath) {
        const fullPath = path.join(process.cwd(), file.filePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      await Pdf.findByIdAndDelete(id);

      return true;
    },
  },
};

export default resolvers;
    // =========================
     // Order 
    // =========================

    // =========================
     // contact 
    // =========================
    