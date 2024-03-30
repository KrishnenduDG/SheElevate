import express from "express";
import { userRoleLabel } from "../constants.js";
import { workspaceController } from "../controllers/index.js";
import {
  authTokenMiddleware,
  roleGuardMiddleware,
} from "../middlewares/index.js";

const wsRouter = express.Router();

// User based Routes
wsRouter
  .get(
    "/",
    authTokenMiddleware,
    (req, res, next) => roleGuardMiddleware(req, res, next, [userRoleLabel]),
    workspaceController.getUserWorkspaces
  )
  .post(
    "/",
    authTokenMiddleware,
    (req, res, next) => roleGuardMiddleware(req, res, next, [userRoleLabel]),
    workspaceController.createUserWorkspace
  )
  .delete(
    "/",
    authTokenMiddleware,
    (req, res, next) => roleGuardMiddleware(req, res, next, [userRoleLabel]),
    workspaceController.deleteUserWorkspace
  );

// Public Routes
wsRouter.post("/get-all", workspaceController.getWorkspaces);

export default wsRouter;
