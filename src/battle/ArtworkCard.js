import { ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import FullScreenImageOverlay from "./FullScreenImageOverlay";

function createDisplayTitle(title, dateDisplay) {
  const fittingTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;
  const fittingDate =
    dateDisplay.length > 12 ? `${dateDisplay.slice(0, 12)}...` : dateDisplay;
  return fittingTitle + `, ${fittingDate}`;
}

function ArtworkCard({ artwork }) {
  const displayTitle = createDisplayTitle(artwork.title, artwork.date_display);
  const fullTitle = `${artwork.title}, ${artwork.date_display}`;

  const [showImageOverlay, setShowImageOverlay] = useState(false);

  const openOverlay = () => {
    setShowImageOverlay(true);
  };

  const closeOverlay = () => {
    setShowImageOverlay(false);
  };

  return (
    <div className="flex w-full bg-white rounded-md shadow-md">
      <FullScreenImageOverlay
        url={artwork.image_url}
        handleClose={closeOverlay}
        show={showImageOverlay}
      />
      <div className="w-7/12 aspect-square" onClick={openOverlay}>
        <img
          src={artwork.image_url}
          alt="Artwork"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2">
        <div className="space-y-1">
          <h3
            title={`${displayTitle !== fullTitle ? fullTitle : ""}`}
            className="font-serif text-lg font-bold"
          >
            {displayTitle}
          </h3>
          <span className="block font-serif text-md">
            {artwork.artist_title}
          </span>
          <button className="text-purple">
            <span className="font-bold text-md">Learn More</span>
            <ArrowForwardIos />
          </button>
        </div>
        <div>
          <button className="block px-4 py-2 m-auto border-2 border-purple text-purple">
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtworkCard;
