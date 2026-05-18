import mongoose from "mongoose";

const resultFileSchema = new mongoose.Schema(
  {
    fileName: String,

    filePath: String,

    // Cloudinary public id
    publicId: String,

    className: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate class + year + level
resultFileSchema.index(
  { className: 1, year: 1, level: 1 },
  { unique: true }
);

export default mongoose.model(
  "ResultFile",
  resultFileSchema
);