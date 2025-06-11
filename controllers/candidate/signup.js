const bcrypt = require("bcrypt");
const candidateModel = require("../../models/candidate");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await candidateModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "Candidate created successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = signUp;
