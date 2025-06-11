const bcrypt = require("bcrypt");
const recruiterModel = require("../../models/recruiter");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await recruiterModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "Recruiter created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = signUp;
