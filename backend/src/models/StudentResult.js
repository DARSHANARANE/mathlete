import mongoose from "mongoose";

const studentResultSchema = new mongoose.Schema({
  studentName: String,
  rollNumber: String,
  class: String,
  schoolName: String,
  score: Number,
  rank: Number,
  meritTitle: String,
  year: String,
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ResultFile",
  },
});

export default mongoose.model("StudentResult", studentResultSchema);