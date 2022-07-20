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

  const methodQiwi = await prisma.method.create({
    data: {
      name: "Qiwi",
      isActive: true,
      methodkey:{
        connectOrCreate:{
          where:{
            id: 0
          },
          create:{
            SECRET_KEY: "",
            PUBLIC_KEY: "",
          }
        }
      }
    },
  });

  const methodKassa = await prisma.method.create({
    data: {
      name: "FreeKassa",
      isActive: true,
      methodkey:{
        connectOrCreate:{
          where:{
            id: 1
          },
          create:{
            SECRET_KEY: "",
            PUBLIC_KEY: "",
          }
        }
      }
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