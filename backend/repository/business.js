import { PrismaClient } from "@prisma/client";

export default class BusinessRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getBusinessByBid = async (bid) => {
    try {
      const existingBusiness = await this.prisma.business.findFirst({
        where: { bid },
      });

      return {
        serverFlag: true,
        resFlag: existingBusiness ? true : false,
        business: existingBusiness,
        msg: existingBusiness ? "Business found" : "Business not found",
      };
    } catch (error) {
      return {
        serverFlag: false,
        resFlag: false,
        business: null,
        msg: "Internal Server error",
      };
    }
  };

  getBusinessByUserName = async (userName) => {
    try {
      const existingBusiness = await this.prisma.business.findFirst({
        where: { userName },
      });

      return {
        serverFlag: true,
        resFlag: existingBusiness ? true : false,
        business: existingBusiness,
        msg: existingBusiness ? "Business found" : "Business not found",
      };
    } catch (error) {
      return {
        serverFlag: false,
        resFlag: false,
        business: null,
        msg: "Internal Server error",
      };
    }
  };

  registerBusiness = async (businessData, categories) => {
    try {
      const categoryData = [];
      let existingCategory;
      let newCategory;

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

      console.log(businessData);
      // Creating the new Business
      const newBusiness = await this.prisma.business.create({
        data: businessData,
      });

      // Mapping the business with categories
      for (let c of categoryData)
        await this.prisma.businessCategoryMapping.create({
          data: { bid: newBusiness.bid, cid: c.cid },
        });

      return {
        serverFlag: true,
        resFlag: true,
        msg: "Business Created successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        serverFlag: false,
        resFlag: false,
        msg: "Internal Server Error",
      };
    }
  };
}
