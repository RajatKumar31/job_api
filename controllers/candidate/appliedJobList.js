const appliedJobModel = require("../../models/appliedJob");

const appliedJobList = async (req, res) => {
  try {
    const candidateId = req.decoded.candidateId;
    const appliedJobs = await appliedJobModel.find({ candidateId });
    if (appliedJobs.length == 0) {
      return res.json({
        success: true,
        message: "You havent applied to any jobs",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Job fetched successfully",
      data: appliedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = appliedJobList;
