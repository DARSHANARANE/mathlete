import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    pdfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
      required: true,
    },
    title: String,
    amount: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
      type: String,
      default: "paid",
    },
    fileUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);