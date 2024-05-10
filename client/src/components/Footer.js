import githubLogo from "./github-mark-white.png";
import linkedinLogo from "./In-White-14@2x.png";

function Footer() {
  return (
    <footer className="py-4 text-white bg-yellow">
      <div className="flex items-center">
        <div className="flex-1 h-1 bg-white" />
        <div className="flex px-4 space-x-4">
          <a
            href="https://github.com/leoasimon/art-battle"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubLogo} alt="GitHub logo" className="w-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/lyg-sim/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedinLogo} alt="GitHub logo" className="w-8" />
          </a>
        </div>
        <div className="flex-1 h-1 bg-white" />
      </div>
      <div className="mt-2 mb-4">
        <h3 className="text-lg font-bold text-center">Artworks battle</h3>
        <span className="block text-center text-md">
          Copyright © 2024 Léo Simon
        </span>
      </div>
      <div className="p-2 text-xs">
        <span>
          Thanks to the{" "}
          <a
            href="https://www.artic.edu/"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline"
          >
            Art Institute of Chicago
          </a>{" "}
          and their{" "}
          <a
            href="https://api.artic.edu"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline"
          >
            open API
          </a>{" "}
          that made this project possible
        </span>
      </div>
    </footer>
  );
}

export default Footer;
