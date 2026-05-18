import mongoose from "mongoose";

const bookOrderSchema =
  new mongoose.Schema(
    {
      bookId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Book",

        required: true,
      },

      studentName: {
        type: String,
        required: true,
      },

      mobile: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      invoiceNumber: {
        type: String,
      },

      razorpayOrderId: {
        type: String,
        index: true,
      },

      razorpayPaymentId: {
        type: String,
        index: true,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Paid",
          "Failed",
        ],

        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

const BookOrder = mongoose.model(
  "BookOrder",
  bookOrderSchema
);

export default BookOrder;