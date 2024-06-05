import axios from "axios";

export const playMatchup = async (contestantA, contestantB, winner) => {
  await axios.post("/.netlify/functions/play-matchup", {
    contestantA,
    contestantB,
    winner,
  });
};
