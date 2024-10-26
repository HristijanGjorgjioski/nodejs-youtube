import express from "express";
import { getById } from "../controllers/user.controllers";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/:id", authenticate, getById);

export default router;
