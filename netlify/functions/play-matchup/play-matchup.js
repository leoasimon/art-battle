const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const probability = (ratingOne, ratingTwo) => {
  return (1 * 1) / (1 + 1 * Math.pow(10, (1 * (ratingOne - ratingTwo)) / 400));
};

const eloRating = (ra, rb, k, d) => {
  const pb = probability(ra, rb);
  const pa = probability(rb, ra);

  if (d === 1) {
    const newRa = Math.round(ra + k * (1 - pa));
    const newRb = Math.round(rb + k * (0 - pb));
    return [newRa, newRb];
  }
  const newRa = Math.round(ra + k * (0 - pa));
  const newRb = Math.round(rb + k * (1 - pb));
  return [newRa, newRb];
};

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const { contestantA, contestantB, winner } = JSON.parse(event.body);

    const [beforeBattleA, beforeBattleB] =
      await prisma.$queryRaw`SELECT t.id, t.score, t.rank, t.artwork_id FROM (SELECT id, score, artwork_id, RANK() OVER (ORDER BY score DESC) rank FROM score ORDER BY score) as t WHERE t.artwork_id in (${contestantA}, ${contestantB});`;

    console.log(beforeBattleA, beforeBattleB);
    const scoreA = beforeBattleA ? beforeBattleA.score : 0;
    const scoreB = beforeBattleB ? beforeBattleB.score : 0;

    const [newScoreA, newScoreB] = eloRating(
      scoreA,
      scoreB,
      32,
      winner === contestantA ? 1 : 0
    );

    const updateScoreA = prisma.score.upsert({
      where: {
        artwork_id: contestantA,
      },
      update: {
        score: newScoreA,
      },
      create: {
        artwork_id: contestantA,
        score: newScoreA,
      },
    });

    const updateScoreB = prisma.score.upsert({
      where: {
        artwork_id: contestantB,
      },
      update: {
        score: newScoreB,
      },
      create: {
        artwork_id: contestantB,
        score: newScoreB,
      },
    });

    const [resA, resB] = await prisma.$transaction([
      updateScoreA,
      updateScoreB,
    ]);

    const winnerAfterBattle =
      await prisma.$queryRaw`SELECT t.id, t.score, t.rank, t.artwork_id FROM (SELECT id, score, artwork_id, RANK() OVER (ORDER BY score DESC) rank FROM score ORDER BY score) as t WHERE t.artwork_id = ${winner};`;

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          beforeBattle: winner === contestantA ? beforeBattleA : beforeBattleB,
          afterBattle: winnerAfterBattle[0],
        },
        (_, v) => (typeof v === "bigint" ? v.toString() : v)
      ),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
