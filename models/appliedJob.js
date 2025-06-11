const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

appliedJobSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("applied_jobs", appliedJobSchema);
