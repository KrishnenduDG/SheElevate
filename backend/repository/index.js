import BusinessRepo from "./business.js";
import CategoryRepo from "./category.js";
import UserRepo from "./user.js";

export const userRepo = new UserRepo();
export const businessRepo = new BusinessRepo();
export const categoryRepo = new CategoryRepo();
