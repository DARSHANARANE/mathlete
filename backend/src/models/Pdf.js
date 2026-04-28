// models/Pdf.js

import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  title: String,
  className: String,
  year: String,
  pages: Number,
  price: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Pdf", pdfSchema);