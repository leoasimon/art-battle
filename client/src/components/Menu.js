import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/">battle</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
}

export default Menu;
