import { PrismaClient } from "@prisma/client";

export default class WorkspaceRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getWorkspaceByName = async (name) => {
    try {
      const existingWorkspace = await this.prisma.workspace.findUnique({
        where: {
          name: name,
        },
      });

      return {
        serverFlag: true,
        resFlag: existingWorkspace ? true : false,
        msg: existingWorkspace ? "Workspace Found" : "Workspace not found",
        workspace: existingWorkspace,
      };
    } catch (error) {
      console.log(error);
      return {
        serverFlag: false,
        resFlag: false,
        msg: "Internal Server error",
        workspace: null,
      };
    }
  };
}
