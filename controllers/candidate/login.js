const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const candidateModel = require("../../models/candidate");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await candidateModel.find({ email });
    if (candidate.length == 0) {
      return res
        .status(500)
        .json({ success: false, message: "Candidate does not exist" });
    }
    const hashedPassword = candidate[0].password;
    const result = bcrypt.compareSync(password, hashedPassword);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = {
      candidateId: candidate[0]._id,
      candidateEmail: candidate[0].email,
    };
    const token = jwt.sign(payload, process.env.CANDIDATE_JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(201)
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = login;
