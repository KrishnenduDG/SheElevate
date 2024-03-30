import { PrismaClient } from "@prisma/client";

export default class UtilsRepo {
  constructor() {
    this.prisma = new PrismaClient();

    async function checkvalidusername(username, model) {
        try {
          let result;
      
          switch (model) {
            case 'ModelUser':
              result = await modelUser.findOne({ where: { username: username } });
              break;
            case 'ModelBusiness':
              result = await modelBusiness.findOne({ where: { username: username } });
              break;
            default:
              throw new Error('Invalid model specified');
          }
      
          if (result) {
            console.log(`Username ${username} exists in ${model}.`);
          } else {
            console.log(`Username ${username} does not exist in ${model}.`);
          }
        } catch (error) {
          console.error('Error checking username:', error);
        } 
      }
    }
}