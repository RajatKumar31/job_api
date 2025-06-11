const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("recruiter", recruiterSchema);
