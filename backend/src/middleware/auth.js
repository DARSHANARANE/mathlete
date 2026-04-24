import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    return user;
  } catch (error) {
    return null;
  }
};

export default authMiddleware;