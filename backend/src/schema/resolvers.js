import bcrypt from "bcrypt";
import User from "../models/User.js";
import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js";
import Order from "../models/Order.js";
import Contact from "../models/Contact.js";
import generateToken from "../utils/generateToken.js";

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

    // ======================
    // RESULT FILES
    // ======================
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

    // ======================
    // GET YEARS
    // ======================
    getYears: async () => {
      return await ResultFile.distinct("year");
    },

    // ======================
    // GET CLASSES BY YEAR
    // ======================
    getClasses: async (_, { year }) => {
      const filter = {};

      if (year && year !== "all") {
        filter.year = year;
      }

      return await ResultFile.distinct("className", filter);
    },

    // ======================
    // GET FILE BY CLASS
    // ======================
    getResultFileByClass: async (_, { year, className }) => {
      const file = await ResultFile.findOne({
        year,
        className,
      });

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

    // ======================
    // GET ALL PDFS
    // ======================
    getPdfs: async () => {
      const pdfs = await Pdf.find().sort({
        uploadedAt: -1,
      });

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

    // ======================
    // GET SINGLE PDF
    // ======================
    getPdf: async (_, { id }) => {
      const file = await Pdf.findById(id);

      if (!file) return null;

      return {
        id: file._id.toString(),
        ...file._doc,
      };
    },

    // ======================
    // GET ORDERS
    // ======================
    getOrders: async () => {
      const orders = await Order.find().sort({
        createdAt: -1,
      });

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

    // ======================
    // GET CONTACTS
    // ======================
    getContacts: async () => {
      const contacts = await Contact.find().sort({
        createdAt: -1,
      });

      return contacts.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
      }));
    },
  },

  Mutation: {
    // ======================
    // LOGIN
    // ======================
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },

    // ======================
    // DELETE RESULT FILE
    // ======================
    deleteResultFile: async (_, { id }) => {
      const file = await ResultFile.findById(id);

      if (!file) {
        throw new Error("File not found");
      }

      await ResultFile.findByIdAndDelete(id);

      return true;
    },

    // ======================
    // DELETE PDF
    // ======================
    deletePdf: async (_, { id }, { user }) => {
      isAdmin(user);

      const file = await Pdf.findById(id);

      if (!file) {
        throw new Error("PDF not found");
      }

      await Pdf.findByIdAndDelete(id);

      return true;
    },

    // ======================
    // CONTACT US
    // ======================
    createContact: async (
      _,
      { name, email, subject, message }
    ) => {
      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });

      return {
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt:
          contact.createdAt.toISOString(),
      };
    },
  },
};

export default resolvers;