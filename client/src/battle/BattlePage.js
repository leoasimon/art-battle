import { useState } from "react";
import useRandomArtworks from "../artworks/useRandomArtworks";
import useMatchup from "./useMatchup";

function BattlePage() {
  const { status, imageUrls, artworksData } = useRandomArtworks();

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const { playMatchup, status: matchupStatus } = useMatchup();

  const selectArtwork = (index) => {
    setSelectedArtwork(index);
  };

  const cancelSelection = () => {
    setSelectedArtwork(null);
  };

  const validateSelection = () => {
    if (selectedArtwork === null) {
      return;
    }

    // Call the playMatchup function from useMatchup.js
    // with the selected artwork and the other artwork
    // that was not selected
    playMatchup(
      artworksData[0].id,
      artworksData[1].id,
      artworksData[selectedArtwork].id
    );
  };

  return (
    <div className="p-4">
      {selectedArtwork !== null && (
        <div className="absolute top-0 left-0 flex flex-col justify-center w-screen h-screen">
          <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
          <div className="relative z-20 flex flex-col m-auto bg-white rounded-lg shadow-md w-96 h-96">
            <span className="p-4 text-center">
              You selected {artworksData[selectedArtwork].artist_title}'s
              artwork
            </span>
            <div className="flex-1 p-4">
              <img
                src={imageUrls[selectedArtwork]}
                alt="Selected artwork"
                className="object-cover w-48 h-48 m-auto"
              />
            </div>
            {matchupStatus === "idle" && (
              <div className="flex justify-center p-4 space-x-2">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={validateSelection}
                >
                  Confirm your selection
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={cancelSelection}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <span>Pick your favorite artwork</span>
      <div className="p-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "idle" && imageUrls.length > 0 && (
          <div className="flex">
            <div className="flex-1 p-4">
              <h2 className="m-auto">
                {artworksData[0].artist_title} - {artworksData[0].title}
              </h2>
              <button>
                <img
                  src={imageUrls[0]}
                  alt="Artwork 1"
                  className="h-full aspect-auto"
                  onClick={() => selectArtwork(0)}
                />
              </button>
            </div>
            <div>VS</div>
            <div className="flex-1 p-4">
              <h2 className="m-auto">
                {artworksData[1].artist_title} - {artworksData[1].title}
              </h2>
              <button>
                <img
                  src={imageUrls[1]}
                  alt="Artwork 2"
                  className="m-auto w-96"
                  onClick={() => selectArtwork(1)}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;
