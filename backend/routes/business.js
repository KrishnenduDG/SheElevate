import express from "express";
import { businessController } from "../controllers/index.js";

const businessRouter = express.Router();

// Auth Routes
businessRouter
  .get("/:username", businessController.getProfile)
  .post("/register", businessController.register);

export default businessRouter;
