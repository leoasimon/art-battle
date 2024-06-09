import axios from "axios";

export const playMatchup = async (contestantA, contestantB, winner) => {
  const response = await axios.post("/.netlify/functions/play-matchup", {
    contestantA,
    contestantB,
    winner,
  });

  const result = response.data;

  return result;
};
