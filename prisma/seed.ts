import { PrismaClient } from "@prisma/client";
import bcrypt from "@node-rs/bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const username = "admin_hyneo";

  //Проверка на то, что есть ли в базе пользователь с таким именем
  await prisma.user.delete({ where: { username } }).catch(() => {

  });

  const hashedPassword = await bcrypt.hash("supermegaadmin", 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });


  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });