import { Request, Response } from "express";
import * as userService from "../services/user.services";

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getById(Number(id));

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};
