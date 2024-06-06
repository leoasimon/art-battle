import angleLeft from "./angle-left.png";
import angleRight from "./angle-right.png";
import endLeft from "./end-left.png";
import endRight from "./end-right.png";

import { useEffect, useState } from "react";
import { fetchLeaderboard } from "./leaderboardApi";

function LeaderboardPage() {
  const [status, setStatus] = useState("idle");
  const [leaderboard, setLeaderboard] = useState([]);
  const [nPages, setNPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setStatus("loading");
    fetchLeaderboard(page).then(({ artworks, nPages }) => {
      setLeaderboard(artworks);
      setNPages(nPages);
      setStatus("idle");
    });
  }, [page]);

  const pages = Array.from({ length: nPages }, (_, i) => i + 1);

  const goToPage = (p) => {
    setPage(p);
  };

  const goNext = () => {
    setPage(page + 1);
  };

  const goPrev = () => {
    setPage(page - 1);
  };

  const goToEnd = () => {
    setPage(nPages);
  };

  const goToStart = () => {
    setPage(1);
  };

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "idle" && leaderboard.length > 0 && (
        <div>
          <div className="flex flex-col mt-4 bg-white">
            <div className="flex p-3 font-bold border-b border-magenta">
              <span className="w-12">#</span>
              <span className="flex-1">Name</span>
              <span className="flex-1">Artist</span>
              <span className="w-12">Score</span>
            </div>
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex p-3 ${
                  index % 2 === 0 ? "bg-light-pink" : "bg-white"
                }`}
              >
                <span className="w-12">{entry.rank}</span>
                <span className="flex-1 pr-2 overflow-hidden italic text-ellipsis whitespace-nowrap">
                  {entry.artwork.title}
                </span>
                <span className="flex-1 pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {entry.artwork.artist_title || "Unknown"}
                </span>
                <span className="w-12">{entry.score}</span>
              </div>
            ))}
          </div>
          <div className="flex p-2 text-black align-middle">
            <button
              disabled={page === 1}
              className="mr-3 disabled:opacity-40"
              onClick={goToStart}
            >
              <img src={endLeft} alt="first page" className="h-6" />
            </button>
            <button
              disabled={page === 1}
              className="mr-2 disabled:opacity-40"
              onClick={goPrev}
            >
              <img src={angleLeft} alt="previous page" className="h-6" />
            </button>
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                disabled={p === page}
                className={`w-8 h-8 ${
                  p === page ? "text-white bg-magenta" : ""
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === nPages}
              className="ml-2 disabled:opacity-40"
              onClick={goNext}
            >
              <img src={angleRight} alt="next page" className="h-6" />
            </button>
            <button
              disabled={page === nPages}
              className="ml-3 disabled:opacity-40"
              onClick={goToEnd}
            >
              <img src={endRight} alt="last page" className="h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
