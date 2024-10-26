import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/request";

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized!");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ""
    ) as DecodedToken;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
  }
};
