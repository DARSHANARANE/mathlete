import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/User.js";
import ResultFile from "../models/ResultFile.js";
import Pdf from "../models/Pdf.js";
import Order from "../models/Order.js";
import Contact from "../models/Contact.js";
import Book from "../models/Book.js";
import BookOrder from "../models/BookOrder.js";

import generateToken from "../utils/generateToken.js";

import razorpay from "../config/razorpay.js";
import cloudinary from "../config/cloudinary.js";

// ======================
// ADMIN CHECK
// ======================

const isAdmin = (user) => {
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
};

const resolvers = {
  // =====================================================
  // QUERY
  // =====================================================

  Query: {
    hello: () => "Server is running 🚀",

    adminData: (_, __, { user }) => {
      isAdmin(user);

      return "Secret Admin Data 🔐";
    },

    // =====================================================
    // RESULT FILES
    // =====================================================

    getResultFiles: async () => {
      const files = await ResultFile.find().sort({
        uploadedAt: -1,
      });

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

    // =====================================================
    // RESULT YEARS
    // =====================================================

    getResultYears: async () => {
      const years = await ResultFile.distinct("year");

      return years.sort(
        (a, b) =>
          Number(b.split("-")[0]) -
          Number(a.split("-")[0])
      );
    },

    // =====================================================
    // PDF YEARS
    // =====================================================

    getPdfYears: async () => {
      const years = await Pdf.distinct("year");

      return years.sort(
        (a, b) =>
          Number(b.split("-")[0]) -
          Number(a.split("-")[0])
      );
    },

    // =====================================================
    // CLASSES
    // =====================================================

    getClasses: async (_, { year }) => {
      const filter = {};

      if (year && year !== "all") {
        filter.year = year;
      }

      return await ResultFile.distinct(
        "className",
        filter
      );
    },

    // =====================================================
    // GET RESULT FILE
    // =====================================================

    getResultFileByClass: async (
      _,
      { year, className }
    ) => {
      const file =
        await ResultFile.findOne({
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

    // =====================================================
    // SINGLE PDF
    // =====================================================

    getPdf: async (_, { id }) => {
      const file = await Pdf.findById(id);

      if (!file) return null;

      return {
        id: file._id.toString(),

        ...file._doc,
      };
    },

    // =====================================================
    // PDFS
    // =====================================================

    getPdfs: async (_, { level }) => {
      const filter = {};

      if (level) {
        filter.level = level;
      }

      const pdfs = await Pdf.find(filter).sort({
        uploadedAt: -1,
      });

      return pdfs.map((file) => ({
        id: file._id.toString(),

        fileName: file.fileName,

        filePath: file.filePath,

        title: file.title,

        className: file.className,

        level: file.level,

        year: file.year,

        pages: file.pages,

        price: file.price,

        uploadedAt: file.uploadedAt,
      }));
    },

    // =====================================================
    // ORDERS
    // =====================================================

    getOrders: async () => {
      const orders = await Order.find().sort({
        createdAt: -1,
      });

      return orders.map((item) => ({
        id: item._id.toString(),

        amount: item.amount,

        razorpayOrderId:
          item.razorpayOrderId,

        razorpayPaymentId:
          item.razorpayPaymentId,

        createdAt:
          item.createdAt?.toISOString(),

        fileUrl: item.fileUrl,

        status: item.status,
      }));
    },

    // =====================================================
    // CONTACTS
    // =====================================================

    getContacts: async () => {
      const contacts =
        await Contact.find().sort({
          createdAt: -1,
        });

      return contacts.map((item) => ({
        id: item._id.toString(),

        name: item.name,

        email: item.email,

        subject: item.subject,

        message: item.message,

        status: item.status,

        createdAt:
          item.createdAt.toISOString(),
      }));
    },

    // =====================================================
    // BOOKS
    // =====================================================

    getBooks: async () => {
      const books = await Book.find().sort({
        createdAt: -1,
      });

      return books.map((item) => ({
        id: item._id.toString(),

        title: item.title,

        description:
          item.description,

        className:
          item.className,

        level: item.level,

        price: item.price,

        createdAt:
          item.createdAt.toISOString(),
      }));
    },

    // =====================================================
    // BOOK ORDERS
    // =====================================================

    getBookOrders: async () => {
      const orders =
        await BookOrder.find()
          .populate("bookId")
          .sort({
            createdAt: -1,
          });

      return orders.map((item) => ({
        id: item._id.toString(),

        studentName:
          item.studentName,

        mobile: item.mobile,

        email: item.email,

        address: item.address,

        pincode: item.pincode,

        amount: item.amount,

        status: item.status,

        razorpayOrderId:
          item.razorpayOrderId,

        razorpayPaymentId:
          item.razorpayPaymentId,

        invoiceNumber:
          item.invoiceNumber,

        createdAt:
          item.createdAt.toISOString(),

        book: item.bookId,
      }));
    },
  },

  // =====================================================
  // MUTATION
  // =====================================================

  Mutation: {
    // =====================================================
    // LOGIN
    // =====================================================

    login: async (
      _,
      { email, password }
    ) => {
      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        throw new Error(
          "Invalid credentials"
        );
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        throw new Error(
          "Invalid credentials"
        );
      }

      const token =
        generateToken(user);

      return {
        token,
        user,
      };
    },

    // =====================================================
    // DELETE RESULT FILE
    // =====================================================

    deleteResultFile: async (
      _,
      { id }
    ) => {
      const file =
        await ResultFile.findById(id);

      if (!file) {
        throw new Error(
          "File not found"
        );
      }

      await ResultFile.findByIdAndDelete(
        id
      );

      return true;
    },

    // =====================================================
    // DELETE PDF
    // =====================================================

    deletePdf: async (
      _,
      { id },
      { user }
    ) => {
      isAdmin(user);

      const file =
        await Pdf.findById(id);

      if (!file) {
        throw new Error(
          "PDF not found"
        );
      }

      await Pdf.findByIdAndDelete(id);

      return true;
    },

    // =====================================================
    // CONTACT
    // =====================================================

    createContact: async (
      _,
      {
        name,
        email,
        subject,
        message,
      }
    ) => {
      const contact =
        await Contact.create({
          name,
          email,
          subject,
          message,
        });

      return {
        id: contact._id.toString(),

        name: contact.name,

        email: contact.email,

        subject:
          contact.subject,

        message:
          contact.message,

        status: contact.status,

        createdAt:
          contact.createdAt.toISOString(),
      };
    },

    // =====================================================
    // CREATE BOOK
    // =====================================================

    createBook: async (
      _,
      {
        title,
        description,
        className,
        level,
        price,
      },
      { user }
    ) => {
      isAdmin(user);

      const book =
        await Book.create({
          title,
          description,
          className,
          level,
          price,
        });

      return {
        id: book._id.toString(),

        title: book.title,

        description:
          book.description,

        className:
          book.className,

        level: book.level,

        price: book.price,

        createdAt:
          book.createdAt.toISOString(),
      };
    },

    // =====================================================
    // DELETE BOOK
    // =====================================================
    deleteBook: async (
      _,
      { id },
      { user }
    ) => {
      isAdmin(user);

      const book = await Book.findById(id);

      if (!book) {
        throw new Error("Book not found");
      }

      await Book.findByIdAndDelete(id);

      return true;
    },
    // =====================================================
    // CREATE RAZORPAY ORDER
    // =====================================================

    createRazorpayOrder: async (
      _,
      { amount }
    ) => {
      try {
        const order =
          await razorpay.orders.create({
            amount: amount * 100,

            currency: "INR",
          });

        return {
          id: order.id,

          amount: order.amount,

          currency: order.currency,
        };
      } catch (err) {
        console.error(
          "Razorpay order creation failed:",
          err
        );

        throw new Error(
          "Failed to create Razorpay order"
        );
      }
    },

    // =====================================================
    // VERIFY PDF PAYMENT
    // =====================================================

    verifyPdfPayment: async (
      _,
      {
        pdfId,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
    ) => {
      try {
        const pdf =
          await Pdf.findById(pdfId);

        if (!pdf) {
          return {
            success: false,

            message: "PDF not found",

            downloadUrl: null,

            orderId: null,

            razorpayOrderId: null,

            razorpayPaymentId: null,

            amount: null,
          };
        }

        const generatedSignature =
          crypto
            .createHmac(
              "sha256",
              process.env
                .RAZORPAY_KEY_SECRET
            )
            .update(
              `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (
          generatedSignature !==
          razorpay_signature
        ) {
          return {
            success: false,

            message:
              "Invalid Razorpay signature",

            downloadUrl: null,

            orderId: null,

            razorpayOrderId: null,

            razorpayPaymentId: null,

            amount: null,
          };
        }

        const downloadUrl =
          pdf.filePath.replace(
            "/upload/",
            "/upload/fl_attachment/"
          );

        const savedOrder =
          await Order.create({
            pdfId,

            title: pdf.title,

            amount,

            razorpayOrderId:
              razorpay_order_id,

            razorpayPaymentId:
              razorpay_payment_id,

            status: "paid",

            fileUrl: downloadUrl,
          });

        return {
          success: true,

          message:
            "Payment verified successfully",

          downloadUrl,

          orderId:
            savedOrder._id.toString(),

          razorpayOrderId:
            savedOrder.razorpayOrderId,

          razorpayPaymentId:
            savedOrder.razorpayPaymentId,

          amount:
            savedOrder.amount,
        };
      } catch (err) {
        console.error(
          "VERIFY PDF PAYMENT ERROR:",
          err
        );

        return {
          success: false,

          message:
            err.message ||
            "Payment verification failed",

          downloadUrl: null,

          orderId: null,

          razorpayOrderId: null,

          razorpayPaymentId: null,

          amount: null,
        };
      }
    },

    // =====================================================
    // VERIFY BOOK PAYMENT
    // =====================================================

    verifyBookPayment: async (
      _,
      {
        bookId,
        studentName,
        mobile,
        email,
        address,
        pincode,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
    ) => {
      try {
        const book =
          await Book.findById(bookId);

        if (!book) {
          return {
            success: false,

            message: "Book not found",

            orderId: null,

            razorpayOrderId: null,

            razorpayPaymentId:
              null,

            amount: null,

            invoiceNumber: null,
          };
        }

        const generatedSignature =
          crypto
            .createHmac(
              "sha256",
              process.env
                .RAZORPAY_KEY_SECRET
            )
            .update(
              `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (
          generatedSignature !==
          razorpay_signature
        ) {
          return {
            success: false,

            message:
              "Invalid Razorpay signature",

            orderId: null,

            razorpayOrderId: null,

            razorpayPaymentId:
              null,

            amount: null,

            invoiceNumber: null,
          };
        }

        const invoiceNumber = `INV-${Date.now()}`;

        const savedOrder =
          await BookOrder.create({
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

        return {
          success: true,

          message:
            "Payment verified successfully",

          orderId:
            savedOrder._id.toString(),

          razorpayOrderId:
            savedOrder.razorpayOrderId,

          razorpayPaymentId:
            savedOrder.razorpayPaymentId,

          amount:
            savedOrder.amount,

          invoiceNumber:
            savedOrder.invoiceNumber,
        };
      } catch (err) {
        console.error(err);

        return {
          success: false,

          message:
            err.message ||
            "Payment verification failed",

          orderId: null,

          razorpayOrderId: null,

          razorpayPaymentId:
            null,

          amount: null,

          invoiceNumber: null,
        };
      }
    },
  },
};

export default resolvers;