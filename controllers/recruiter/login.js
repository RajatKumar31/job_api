const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const recruiterModel = require("../../models/recruiter");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await recruiterModel.find({ email });
    if (recruiter.length == 0) {
      return res
        .status(500)
        .json({ success: false, message: "Recruiter does not exist" });
    }
    const hashedPassword = recruiter[0].password;
    const result = bcrypt.compareSync(password, hashedPassword);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = {
      recruiterId: recruiter[0]._id,
    };
    const token = jwt.sign(payload, process.env.RECRUITER_JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(201)
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = login;
