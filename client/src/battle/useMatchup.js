import axios from "axios";
import { useState } from "react";

function useMatchup() {
  const [status, setStatus] = useState("idle");

  const playMatchup = async (contestantA, contestantB, winner) => {
    setStatus("loading");
    console.log("playMatchup", contestantA, contestantB, winner);
    await axios.post("http://localhost:8080/matchup", {
      contestantA,
      contestantB,
      winner,
    });
    setStatus("idle");
  };

  return { playMatchup, status };
}

export default useMatchup;
