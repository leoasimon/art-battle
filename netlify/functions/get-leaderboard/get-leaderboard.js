const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // const subject = event.queryStringParameters.name || 'World'
    const page = event.queryStringParameters.page || 1;
    const offset = Math.max(0, page - 1) * 10;

    const leaderboard =
      await prisma.$queryRaw`SELECT id, score, artwork_id, RANK() OVER (ORDER BY score DESC) rank FROM score ORDER BY score DESC LIMIT 10 OFFSET ${offset};`;

    const withRanking = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + offset + 1,
    }));
    const total = await prisma.score.count();
    const nPages = Math.ceil(total / 10);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          total,
          nPages,
          data: leaderboard,
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
