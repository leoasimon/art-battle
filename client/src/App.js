import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import BattlePage from "./battle/BattlePage";
import LeaderboardPage from "./leaderboard/LeaderboardPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BattlePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
