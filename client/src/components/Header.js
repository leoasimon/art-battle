import Menu from "./Menu";

function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-6 text-black bg-yellow">
      <h1>Artworks battle</h1>
      <Menu />
    </header>
  );
}

export default Header;
