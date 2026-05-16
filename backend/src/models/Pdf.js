import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },

  filePath: {
    type: String,
    required: true,
  },

  // ✅ NEW
  publicId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  className: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  pages: {
    type: Number,
  },

  price: {
    type: Number,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Pdf", pdfSchema);