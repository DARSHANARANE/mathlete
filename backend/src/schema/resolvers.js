import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// 🔐 Helper: Admin check
const isAdmin = (user) => {
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
};

const resolvers = {
  Query: {
    // Public
    hello: () => "Server is running 🚀",

    // 🔐 Protected (Admin only)
    adminData: (_, __, { user }) => {
      isAdmin(user);
      return "Secret Admin Data 🔐";
    },
  },

  Mutation: {
    // 🔐 Admin Login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};

export default resolvers;