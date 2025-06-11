const jobModel = require("../../models/job");

const createJob = async (req, res) => {
  try {
    const recruiterId = req.decoded.recruiterId;
    const { title, description } = req.body;
    await jobModel.create({
      title,
      description,
      recruiterId,
    });
    return res
      .status(201)
      .json({ success: true, message: "Job created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = createJob;
