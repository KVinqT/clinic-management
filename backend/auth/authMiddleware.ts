import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  const {} = req.body;
  const authorization = headers.authorization;
  if (!authorization) {
    return res.status(401);
  }
  const token = authorization?.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Invalid Token" });
    } else {
      //@ts-ignore
      req["user"] = decoded;
      next();
    }
  });
};
