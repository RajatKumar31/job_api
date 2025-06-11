const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

require("./db");
const candidateRouter = require("./routes/candidate");
const recruiterRouter = require("./routes/recruiter");
require("./config/emailWorker");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/candidate", candidateRouter);
app.use("/api/recruiter", recruiterRouter);

// no route found
app.use((req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Invalid route, please check the URL",
  });
});

// error handler
app.use((error, req, res, next) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
