const jobModel = require("../../models/job");

const jobList = async (req, res) => {
  try {
    const allJobs = await jobModel.find({});
    if (allJobs.length == 0) {
      return res.json({ success: false, message: "No jobs found" });
    }
    return res.json({
      success: true,
      message: "Jobs fetched successfully",
      jobs: allJobs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = jobList;
