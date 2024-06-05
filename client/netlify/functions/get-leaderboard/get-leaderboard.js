const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // const subject = event.queryStringParameters.name || 'World'
    const page = event.queryStringParameters.page || 1;
    const offset = Math.max(0, page - 1) * 10;

    const leaderboard = await prisma.score.findMany({
      skip: offset,
      take: 10,
      orderBy: {
        score: "desc",
      },
    });

    const total = await prisma.score.count();
    const nPages = Math.ceil(total / 10);

    return {
      statusCode: 200,
      body: JSON.stringify({
        total,
        nPages,
        data: leaderboard,
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
