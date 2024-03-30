import express from "express";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

// Auth Routes
userRouter
  .get("/:username", userController.getProfile)
  .post("/register", userController.register);

export default userRouter;
