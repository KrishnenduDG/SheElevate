import { PrismaClient } from "@prisma/client";

export default class UserRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserByUid = async (uid) => {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { uid },
      });

      return {
        serverFlag: true,
        resFlag: existingUser ? true : false,
        user: existingUser,
        msg: existingUser ? "User found" : "User not found",
      };
    } catch (error) {
      return {
        serverFlag: false,
        resFlag: false,
        user: null,
        msg: "Internal Server error",
      };
    }
  };

  getUserByUsername = async (userName) => {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { userName },
      });

      return {
        serverFlag: true,
        resFlag: existingUser ? true : false,
        user: existingUser,
        msg: existingUser ? "User found" : "User not found",
      };
    } catch (error) {
      return {
        serverFlag: false,
        resFlag: false,
        user: null,
        msg: "Internal Server error",
      };
    }
  };
  registerUser = async (userData) => {
    try {
      const newUser = await this.prisma.user.create({ data: userData });

      return { serverFlag: true, msg: "User registered successfully" };
    } catch (error) {
      return { serverFlag: false, msg: "Internal Server Error" };
    }
  };
}
