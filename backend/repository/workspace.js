import { PrismaClient } from "@prisma/client";

export default class WorkspaceRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getWorkspaceDetailsFull = async (wid) => {
    try {
      const exsitingWorkspace = await this.prisma.workspace.findFirst({
        where: { wid },
      });

      if (!exsitingWorkspace)
        return {
          serverFlag: true,
          resFlag: false,
          workspace: null,
          msg: "Workspace not found",
        };

      const WorkspaceImages = await this.prisma.productImage.findMany({
        where: { wid },
      });

      const categories = [];
      const workspaceCategoryMappings =
        await this.prisma.workspaceCategoryMapping.findMany({ where: { wid } });

      console.log(workspaceCategoryMappings);
      for (let mapping of workspaceCategoryMappings) {
        const category = await this.prisma.category.findFirst({
          where: { cid: mapping.cid },
        });

        categories.push(category);
      }

      console.log("Here");
      const resWorkspace = {
        ...exsitingWorkspace,
        categories,
        images: WorkspaceImages,
      };

      return {
        serverFlag: true,
        resFlag: true,
        msg: "Workspace Fetched",
        workspace: resWorkspace,
      };
    } catch (error) {
      return {
        serverFlag: false,
        resFlag: false,
        msg: "Internal server Error",
        workspace: null,
      };
    }
  };

  getWorkspaceByName = async (name) => {
    try {
      const existingWorkspace = await this.prisma.workspace.findUnique({
        where: {
          name: name,
        },
      });

      if (!existingWorkspace)
        return {
          serverFlag: true,
          resFlag: false,
          msg: "Workspace not found",
          workspace: null,
        };

      console.log(existingWorkspace);
      const { serverFlag, resFlag, msg, workspace } =
        await this.getWorkspaceDetailsFull(existingWorkspace.wid);

      return {
        serverFlag: true,
        resFlag: existingWorkspace ? true : false,
        msg: existingWorkspace ? "Workspace Found" : "Workspace not found",
        workspace: workspace,
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

  uploadWorkspaceImages = async (images, wid) => {
    for (let img of images) {
      const newImage = await this.prisma.productImage.create({
        data: { imgUrl: img.imgUrl, caption: img.caption, wid: wid },
      });
    }

    return {
      serverFlag: true,
      resFlag: true,
      msg: "Images successfully added",
    };
  };

  createWorkspace = async (wsData, categories, uid) => {
    try {
      const categoryData = [];
      let newCategory;
      let existingCategory;

      const { serverFlag, resFlag } = await this.getWorkspaceByName(
        wsData.name
      );

      if (resFlag)
        return {
          serverFlag: true,
          resFlag: false,
          msg: "Workspace with same name already exists",
          workspace: null,
        };

      // Iterating through the categories and creating if not found
      for (let category of categories) {
        existingCategory = await this.prisma.category.findFirst({
          where: { name: category.name },
        });

        if (!existingCategory) {
          newCategory = await this.prisma.category.create({
            data: { name: category.name, description: category.description },
          });
          categoryData.push(newCategory);
        } else {
          categoryData.push(existingCategory);
        }
      }

      const newWorkspace = await this.prisma.workspace.create({
        data: { name: wsData.name, description: wsData.desc },
      });

      // Mapping the workspace with categories
      for (let c of categoryData)
        await this.prisma.workspaceCategoryMapping.create({
          data: { wid: newWorkspace.wid, cid: c.cid },
        });

      await this.prisma.workspaceUserMapping.create({
        data: { userUid: uid, wid: newWorkspace.wid },
      });
      return {
        serverFlag: true,
        resFlag: true,
        msg: "Workspace Created successfully",
        workspace: newWorkspace,
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
