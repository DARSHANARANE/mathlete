import bcrypt from "bcrypt";
import User from "../models/User.js";
import ResultFile from "../models/ResultFile.js";
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
        filePath: file.filePath, // or fileUrl if you update later
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

    // ✅ STEP 2: Get Classes by Year (FIXED)
    getClasses: async (_, { year }) => {
      const filter = {};
      if (year && year !== "all") {
        filter.year = year;
      }

      return await ResultFile.distinct("className", filter);
    },

    // ✅ STEP 3: Get File by Year + Class (NEW)
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

    // ✅ DELETE FILE
    deleteResultFile: async (_, { id }) => {
      const file = await ResultFile.findById(id);

      if (!file) {
        throw new Error("File not found");
      }

      // 🔥 Delete from disk
      if (file.filePath) {
        const fullPath = path.join(process.cwd(), file.filePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log("File deleted:", fullPath);
        }
      }

      // 🔥 Delete from DB
      await ResultFile.findByIdAndDelete(id);

      return true;
    },
  },
};

export default resolvers;