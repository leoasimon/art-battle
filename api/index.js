const { Client } = require("pg");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const client = new Client(process.env.DATABASE_URL);

const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/leaderboard", async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM scores ORDER BY score DESC LIMIT 10");
    res.json(results.rows);
  } catch (err) {
    console.error("error executing query:", err);
  }
});

app.post("/matchup", async (req, res) => {
  const { contestantA, contestantB, winner } = req.body;

  const scoreAResult = await client.query("SELECT score FROM scores WHERE artwork_id = $1", [contestantA]);
  const scoreBResult = await client.query("SELECT score FROM scores WHERE artwork_id = $1", [contestantB]);

  if (scoreAResult.rowCount === 0) {
    await client.query("INSERT INTO scores (artwork_id, score) VALUES ($1, 500)", [contestantA]);
  }

  if (scoreBResult.rowCount === 0) {
    await client.query("INSERT INTO scores (artwork_id, score) VALUES ($1, 500)", [contestantB]);
  }

  const scoreA = scoreAResult.rowCount === 0 ? 500 : scoreAResult.rows[0].score;
  const scoreB = scoreBResult.rowCount === 0 ? 500 : scoreBResult.rows[0].score;

  const [newScoreA, newScoreB] = eloRating(scoreA, scoreB, 32, winner === contestantA ? 1 : 0);

  await client.query("UPDATE scores SET score = $1 WHERE artwork_id = $2", [newScoreA, contestantA]);
  await client.query("UPDATE scores SET score = $1 WHERE artwork_id = $2", [newScoreB, contestantB]);

  res.json({ newScoreA, newScoreB });
});

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("SELECT NOW()");
//     console.log(results);m
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();

app.listen(8080, async () => {
  await client.connect();
  console.log("Server is running on port 8080");
})

const probability = (ratingOne, ratingTwo) => {
  return (1 * 1) / (1 + 1 * Math.pow(10, (1 * (ratingOne - ratingTwo)) / 400));
};

const eloRating = (
  ra,
  rb,
  k,
  d
) => {
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
