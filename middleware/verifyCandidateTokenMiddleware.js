const jwt = require("jsonwebtoken");

const verifyCandidateTokenMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.CANDIDATE_JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ success: false, message: "Authentication error", err });
          } else {
            req.decoded = decoded;
            next();
          }
        },
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "token not provided" });
    }
  } catch (error) {
    return res.json({ success: false, message: "error", error });
  }
};

module.exports = verifyCandidateTokenMiddleware;
