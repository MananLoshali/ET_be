import jwt from "jsonwebtoken";

// VERIFY TOKEN

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  try {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from verify token",
    });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.id === req.user._id) {
      next();
    } else {
      res.status(403).json({ success: false, mesage: "You are not allowed" });
    }
  });
};
