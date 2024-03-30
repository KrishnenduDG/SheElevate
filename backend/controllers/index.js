import BusinessController from "./business.js";
import UtilsController from "./miscl.js";
import UserController from "./user.js";
import WorkspaceController from "./wokspace.js";

export const userController = new UserController();
export const businessController = new BusinessController();
export const workspaceController = new WorkspaceController();
export const utilsController = new UtilsController();
