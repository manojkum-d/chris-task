import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyJWT";

export const authorizeRole = (role: "admin" | "teacher") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient role." });
    }
    next();
  };
};
