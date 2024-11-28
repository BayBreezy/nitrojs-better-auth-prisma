import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/**
 * This function will seed the database with some data
 *
 * Here I create a main admin user
 */
async function main() {
  await prisma.user.upsert({
    where: { email: "admin@nitrobetterauth.com" },
    update: {},
    create: {
      id: faker.string.uuid(),
      email: "admin@nitrobetterauth.com",
      name: "Super Admin",
      firstName: "Super",
      lastName: "Admin",
      role: "admin",
      emailVerified: true,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
