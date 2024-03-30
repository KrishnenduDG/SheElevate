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
        include: {
          productImage: true,
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
