import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  // lets check if the token is provided or not
  if (!token)
    return res
      .status(401)
      .json({ status: false, message: "UnAutharized - not token provided" });
  try {
    // lets decode the verified user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // lets check if the jwt is verified or not
    if (!decoded)
      return res.status(401).json({
        status: false,
        message: "UnAthuarized - Token is invalid or expried",
      });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
