import { PrismaClient } from "@prisma/client";
import bcrypt from "@node-rs/bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const username = "admin_hyneo";

  //Проверка на то, что есть ли в базе пользователь с таким именем
  await prisma.user.delete({ where: { username } }).catch(() => {

  });
  await prisma.methodKey.deleteMany({});

  await prisma.method.delete({ where: { name: "Qiwi" } }).catch(() => {

  });

  await prisma.method.delete({ where: { name: "FreeKassa" } }).catch(() => {

  });

  await prisma.method.delete({ where: { name: "GetPay" } }).catch(() => {

  });

  await prisma.settings.deleteMany({});


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
      title: "QiWi",
      methodkey: {
        connectOrCreate: {
          where: {
            id: 1
          },
          create: {
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
      title: "FreeKassa",
      methodkey: {
        connectOrCreate: {
          where: {
            id: 2
          },
          create: {
            SECRET_KEY: "",
            PUBLIC_KEY: "",
          }
        }
      }
    },
  });

  const getPay = await prisma.method.create({
    data: {
      name: "GetPay",
      isActive: true,
      title: "GetPay",
      methodkey: {
        connectOrCreate: {
          where: {
            id: 3
          },
          create: {
            SECRET_KEY: "",
            PUBLIC_KEY: "",
          }
        }
      }
    },
  });

  const settings = await prisma.settings.create({
    data: {
      footer: "Тест",
      Vote: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            title: "Голосование",
            name: "Vote",
            active: true,
            url: "https://vote.hyneo.ru",
          },
        },
      },
      Link: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            title: "Ссылка",
            name: "Link",
            active: true,
            url: "https://hyneo.ru",
          },
        }
      },
    }
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