const express = require("express");

const recruiterRouter = express.Router();
const login = require("../controllers/recruiter/login");
const signup = require("../controllers/recruiter/signup");
const createJob = require("../controllers/recruiter/createJob");
const verifyRecruiterTokenMiddleware = require("../middleware/verifyRecruiterTokenMiddleware");
const applicantsList = require("../controllers/recruiter/applicantsList");

recruiterRouter.post("/signup", signup);
recruiterRouter.post("/login", login);

recruiterRouter.post("/job", verifyRecruiterTokenMiddleware, createJob);
recruiterRouter.get(
  "/applicants",
  verifyRecruiterTokenMiddleware,
  applicantsList,
);

module.exports = recruiterRouter;
