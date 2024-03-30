import { PrismaClient } from "@prisma/client";
export default class WorkspaceRepo{
    getWorkspaceByName = (name) => {
        async function getUserByUsername(name) {
            const prisma = new PrismaClient();
            try {
                const result = await prisma.workspace.findUnique({
                  where: {
                    name: name,
                  },
                });
            
                if (result) {
                  console.log(`${name} is present in the database.`);
                  return true;
                } else {
                  console.log(`${name} is not present in the database.`);
                  return false;
                }
              } catch (error) {
                console.error('Error checking name in database:', error);
                return false;
              } finally {
                await prisma.$disconnect();
              }
            }
        }
}
