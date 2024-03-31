import { PrismaClient } from "@prisma/client";
import { worskpaceRepo } from "../repository/index.js";

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

  getWorkspaces = async (uid) => {
    try {
      const workspaces = [];
      let existingWS;

      const existingUserWsMaps =
        await this.prisma.workspaceUserMapping.findMany({
          where: { userUid: uid },
        });

      for (let wsMap of existingUserWsMaps) {
        existingWS = await this.prisma.workspace.findFirst({
          where: { wid: wsMap.wid },
        });

        const { serverFlag, resFlag, msg, workspace } =
          await worskpaceRepo.getWorkspaceDetailsFull(existingWS.wid);

        workspaces.push(workspace);
      }

      return { serverFlag: true, msg: "Workspaces fetched", workspaces };
    } catch (error) {
      console.log(error);
      return {
        serverFlag: false,
        msg: "Internal Server Error",
        workspaces: null,
      };
    }
  };
}
