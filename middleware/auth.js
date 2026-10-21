const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
          return res.status(401).json({
            status: 401,
            message: "Authentication required. Please provide a valid token...",
          });
        }

 
    try {
        const bearerToken = token.split(" ")[1];

      const decodeData = jwt.verify(
        bearerToken,
        process.env.JWTKEY
      );
    //   console.log(decodeData);
      req.user = decodeData;
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: "Invalid token. Please provide a valid authentication token...",
          });
    }

  return next();
};
