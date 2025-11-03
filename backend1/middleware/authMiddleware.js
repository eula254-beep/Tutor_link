// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "tutorlinksecret";

export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Not authorized - token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Not authorized - user not found" });
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Not authorized", error: err.message });
  }
};
