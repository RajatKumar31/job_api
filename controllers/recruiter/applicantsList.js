const appliedJobModel = require("../../models/appliedJob");
const mongoose = require("mongoose");

const applicantsList = async (req, res) => {
  try {
    const recruiterId = req.decoded.recruiterId;
    const applicantsListRes = await appliedJobModel.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "candidateId",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $match: {
          "job.recruiterId": new mongoose.Types.ObjectId(recruiterId),
        },
      },
      {
        $addFields: {
          candidateId: { $first: "$candidate._id" },
          candidateName: { $first: "$candidate.name" },
          candidateEmail: { $first: "$candidate.email" },
          jobTitle: { $first: "$job.title" },
          jobDescription: { $first: "$job.description" },
        },
      },
      {
        $group: {
          _id: "$jobId",
          jobTitle: {
            $first: "$jobTitle",
          },
          jobId: { $first: "$jobId" },
          jobDescription: { $first: "$job.description" },
          applicants: {
            $push: {
              candidateId: "$candidateId",
              candidateName: "$candidateName",
              candidateEmail: "$candidateEmail",
            },
          },
        },
      },
    ]);
    if (applicantsListRes.length == 0) {
      return res.json({
        success: true,
        message: "No jobs found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Applicants list fetched successfully",
      data: applicantsListRes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = applicantsList;
