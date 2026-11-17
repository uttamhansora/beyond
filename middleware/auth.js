const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      message: "Authentication required. Please provide a valid token...",
    });
  }

  const bearerToken = header.slice("Bearer ".length).trim();
  if (!bearerToken || !process.env.JWTKEY) {
    return res.status(401).json({
      status: 401,
      message: "Authentication required. Please provide a valid token...",
    });
  }

  try {
    req.user = jwt.verify(bearerToken, process.env.JWTKEY, {
      algorithms: ["HS256"],
    });
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Invalid token. Please provide a valid authentication token...",
    });
  }
};
