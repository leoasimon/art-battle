import { useEffect, useState } from "react";

const baseApiUrl = "https://api.artic.edu/api/v1/artworks/";

function useLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [status, setStatus] = useState("idle");

    const fetchLeaderboard = async () => {
        setStatus("loading");
        console.log(process.env.REACT_APP_SCORING_API_URL);

        const response = await fetch(`${process.env.REACT_APP_SCORING_API_URL}/leaderboard`);

        const data = await response.json();

        const ps = data.map(entry => {
            return fetch(`${baseApiUrl}${entry.artwork_id}`)
                .then(response => response.json())
                .then(data => {
                    return {
                        ...entry,
                        artwork: data.data
                    }
                })
        })

        const artworks = await Promise.all(ps);

        console.log(artworks);

        setLeaderboard(artworks);

        setStatus("idle");
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return { leaderboard, status };
}

export default useLeaderboard;