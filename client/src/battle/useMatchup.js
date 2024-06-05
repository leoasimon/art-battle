import axios from "axios";
import { useState } from "react";

function useMatchup() {
  const [status, setStatus] = useState("idle");

  const playMatchup = async (contestantA, contestantB, winner) => {
    setStatus("loading");
    await axios.post("/.netlify/functions/play-matchup", {
      contestantA,
      contestantB,
      winner,
    });
    setStatus("idle");
  };

  return { playMatchup, status };
}

export default useMatchup;
