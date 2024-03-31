import { default as BusinessService } from "./business";
import { default as MisclService } from "./miscl";
import { default as UserService } from "./user";
import { default as WorkspaceService } from "./workspace";

export const misclService = new MisclService();
export const businessService = new BusinessService();
export const userService = new UserService();
export const workspaceService = new WorkspaceService();
