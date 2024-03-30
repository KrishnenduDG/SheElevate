import express from "express";
import { utilsController } from "../controllers/index.js";

const misclRouter = express.Router();

misclRouter
  .get("/isValidUsername", utilsController.isValidUsername)
  .post("/isRegistered", utilsController.getRegistrationStatus)
  .get("/isValidWorkspaceName", utilsController.isValidWorkspaceName)
  .get("/getCategories", utilsController.getCategories);
export default misclRouter;
