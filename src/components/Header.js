import MobileMenu from "./MobileMenu";
import Menu from "./Menu";

function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-8 text-black bg-yellow">
      <h1>Artworks battle</h1>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:block">
        <Menu />
      </div>
    </header>
  );
}

export default Header;
