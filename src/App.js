import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import BattlePage from "./battle/BattlePage";
import LeaderboardPage from "./leaderboard/LeaderboardPage";
import ArtistPage from "./artist/ArtistPage";
import ArtworkPage from "./artworks/ArtworkPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BattlePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<div>404 not found</div>} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="artworks/:id" element={<ArtworkPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
