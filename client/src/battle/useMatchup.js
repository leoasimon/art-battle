import axios from "axios"
import { useState } from "react"

function useMatchup() {
    const [status, setStatus] = useState("idle")

    const playMatchup = async (contestantA, contestantB, winner) => {
        setStatus("loading")
        const result = await axios.post("http://localhost:8080/matchup", {
            contestantA,
            contestantB,
            winner
        })
        setStatus("idle")
        console.log("Matchup played", result)   
    }

    return { playMatchup, status }
}

export default useMatchup;