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
    const subject = event.queryStringParameters.name || "World";

    const { contestantA, contestantB, winner } = JSON.parse(event.body);

    const [scoreAResult, scoreBResult] = await prisma.score.findMany({
      where: {
        artwork_id: {
          in: [contestantA, contestantB],
        },
      },
      select: {
        score: true,
      },
    });

    const scoreA = scoreAResult ? scoreAResult.score : 0;
    const scoreB = scoreBResult ? scoreBResult.score : 0;

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

    return {
      statusCode: 200,
      body: JSON.stringify({
        newScoreA,
        newScoreB,
      }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
