import express from "express";
import { upload } from "../config.js";
import { utilsController } from "../controllers/index.js";

const misclRouter = express.Router();

misclRouter
  .get("/isValidUsername", utilsController.isValidUsername)
  .post("/isRegistered", utilsController.getRegistrationStatus)
  .get("/isValidWorkspaceName", utilsController.isValidWorkspaceName)
  .get("/getCategories", utilsController.getCategories)
  .post("/upload-image", upload.single("image"), utilsController.uploadImage);
export default misclRouter;
