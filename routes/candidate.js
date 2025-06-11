const express = require("express");

const candidateRouter = express.Router();
const login = require("../controllers/candidate/login");
const signup = require("../controllers/candidate/signup");
const applyToJob = require("../controllers/candidate/applyToJob");
const appliedJobList = require("../controllers/candidate/appliedJobList");
const verifyCandidateTokenMiddleware = require("../middleware/verifyCandidateTokenMiddleware");
const jobList = require("../controllers/candidate/availableJobList");

candidateRouter.post("/signup", signup);
candidateRouter.post("/login", login);
candidateRouter.post("/apply", verifyCandidateTokenMiddleware, applyToJob);
candidateRouter.get(
  "/applied-jobs",
  verifyCandidateTokenMiddleware,
  appliedJobList,
);
candidateRouter.get("/all-jobs", verifyCandidateTokenMiddleware, jobList);

module.exports = candidateRouter;
