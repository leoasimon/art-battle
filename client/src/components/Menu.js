import { useState } from "react";
import { useNavigate } from "react-router-dom";

import menuIcon from "./menu-icon-olive.png";
import closeIcon from "./close-icon-olive.png";

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goTo = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <div className="flex space-x-2">
      <button onClick={toggleMenu}>
        <img src={menuIcon} alt="menu icon" className="w-8" />
      </button>
      <div
        className={`absolute top-0 left-[-8px] z-10 w-full h-screen ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-full h-full bg-black opacity-60" />
      </div>
      <div
        className={`transition-all duration-200 absolute top-0 ${
          menuOpen ? "right-0" : "right-[-24rem]"
        } z-10 h-screen bg-white shadow-xl w-96`}
      >
        <div className="px-4 py-6">
          <div className="flex justify-end">
            <button onClick={toggleMenu}>
              <img src={closeIcon} alt="close icon" className="w-8" />
            </button>
          </div>
          <div className="flex flex-col items-center py-6 space-y-4 text-lg font-bold uppercase">
            <button onClick={() => goTo("/")}>battle</button>
            <button onClick={() => goTo("/leaderboard")}>Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
