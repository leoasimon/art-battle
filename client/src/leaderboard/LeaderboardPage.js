import useLeaderboard from "./useLeaderboard";

function LeaderboardPage() {
  const { leaderboard, status } = useLeaderboard();

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "idle" && leaderboard.length > 0 && (
        <div className="flex flex-col mt-4 bg-white">
          <div className="flex p-3 font-bold border-b border-magenta">
            <span className="w-12">#</span>
            <span className="flex-1">Name</span>
            <span className="flex-1">Artist</span>
            <span className="w-12">Score</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div
              className={`flex p-3 ${
                index % 2 === 0 ? "bg-light-pink" : "bg-white"
              }`}
              key={entry.id}
            >
              <span className="w-12">{index + 1}</span>
              <span className="flex-1 pr-2 overflow-hidden italic text-ellipsis whitespace-nowrap">
                {entry.artwork.title}
              </span>
              <span className="flex-1 pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {entry.artwork.artist_title}
              </span>
              <span className="w-12">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
