import asyncHandler from "express-async-handler";
import jwt, { decode } from "jsonwebtoken";
import User from '../models/user.js'
export const protectMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (e) {
      res.status(401);
      throw new Error(
        JSON.stringify({ message: "Not authorized, token field" })
      );
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(JSON.stringify({ message: "Not authorized" }));
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(JSON.stringify({ message: "Not authorized as an admin" }));
  }
});
