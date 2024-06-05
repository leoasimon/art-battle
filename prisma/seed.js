const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const minScore = 100;
const maxScore = 1000;

function randomScore() {
  return Math.floor(Math.random() * (maxScore - minScore) + minScore);
}

async function main() {
  const artworkIds = [
    97456, 97457, 97458, 97459, 9746, 97460, 9747, 9748, 9750, 9752, 9754, 9755,
    9756, 9757, 9758,
  ];

  for (const id of artworkIds) {
    await prisma.score.create({
      data: {
        artwork_id: id,
        score: randomScore(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
