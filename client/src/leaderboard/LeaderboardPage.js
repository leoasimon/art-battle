import useLeaderboard from "./useLeaderboard";

function LeaderboardPage() {
  const { leaderboard, status } = useLeaderboard();

  return (
    <div className="p-4">
      <h1>Leaderboard</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "idle" && leaderboard.length > 0 && <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Artwork</th>
                        <th>Artist</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={entry.artwork_id}>
                            <td>{index + 1}</td>
                            <td>{entry.artwork.title}</td>
                            <td>{entry.artwork.artist_title}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>}
    </div>
  );
}

export default LeaderboardPage;
