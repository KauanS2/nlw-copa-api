import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Kauan",
      email: "kauan@gmail.com",
      avatar: "https://github.com/KauanS2.png",
    },
  });
  const pool = await prisma.pool.create({
    data: {
      title: "novo pool",
      code: "asasas",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-04T16:50:35.767Z",
      firstTeamCountryCode: "DE",
      secondeTeamCountryCode: "BR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-04T16:50:35.767Z",
      firstTeamCountryCode: "BR",
      secondeTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                poolId: pool.id,
                userId: user.id,
              },
            },
          },
        },
      },
    },
  });
}
main();
