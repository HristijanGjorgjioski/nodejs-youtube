import { Response, Request } from "express";
import * as authService from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authService.register({ email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.login({ email, password });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
