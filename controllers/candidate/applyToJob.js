const appliedJobModel = require("../../models/appliedJob");
const emailQueue = require("../../config/emailQueue");

const appyToJob = async (req, res) => {
  try {
    const { candidateId, candidateEmail } = req.decoded;
    const { jobId } = req.body;
    await appliedJobModel.create({
      jobId,
      candidateId,
    });

    await emailQueue.add(
      "send-email",
      { email: candidateEmail },
      { attempts: 3 },
    );
    return res
      .status(201)
      .json({ success: true, message: "Job applied successfully" });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(500).json({
        success: false,
        message: "Job already applied",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = appyToJob;
