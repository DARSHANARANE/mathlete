import bcrypt from "bcrypt";
import User from "../models/User.js";
import StudentResult from "../models/StudentResult.js";
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

    // ✅ THIS WAS MISSING (MAIN FIX)
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
    getStudentResults: async (_, { class: cls, year }) => {
      const filter = {};

      if (cls && cls !== "all") filter.class = cls;
      if (year && year !== "all") filter.year = year;

      return await StudentResult.find(filter).sort({ rank: 1 });
    },

  getYears: async () => {
    return await ResultFile.distinct("year");
  },

    getClasses: async (_, { year }) => {
      return await StudentResult.distinct("class", {
        ...(year && year !== "all" ? { year } : {}),
      });
    },
  },
Mutation: {
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user);

    return { token, user };
  },

deleteResultFile: async (_, { id }) => {
  const file = await ResultFile.findById(id);

  if (!file) {
    throw new Error("File not found");
  }

  // 🔥 STEP 1: Delete file from disk
  if (file.filePath) {
    const fullPath = path.join(process.cwd(), file.filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("File deleted from disk:", fullPath);
    }
  }

  // 🔥 STEP 2: Delete from DB
  await ResultFile.findByIdAndDelete(id);

  return true;
}
}
};

export default resolvers;