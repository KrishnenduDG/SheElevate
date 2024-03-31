import { default as BusinessService } from "./business";
import { default as MisclService } from "./miscl";
import { default as UserService } from "./user";

export const misclService = new MisclService();
export const businessService = new BusinessService();
export const userService = new UserService();
