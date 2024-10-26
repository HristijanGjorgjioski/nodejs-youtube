import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    id: number;
    iat: number; // issued at
    exp: number; // expires
  };
}
