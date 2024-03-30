import { PrismaClient } from "@prisma/client";

export default class CategoryRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllCategories = async () => {
    try {
      const existingCategories = await this.prisma.category.findMany();

      return {
        serverFlag: true,
        msg: "Categories fecthed",
        categories: existingCategories,
      };
    } catch (error) {
      return {
        serverFlag: false,
        msg: "Internal Server Error",
        categories: null,
      };
    }
  };
}
