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
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold">Battle</h1>
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
      <div>
        {status === "loading" && <p className="mt-4">Loading...</p>}
        {status === "idle" && imageUrls.length > 0 && (
          <div className="flex flex-col mt-4">
            <div className="flex italic">
              <p className="flex-1 pr-2">{artworksData[0].title}</p>
              <p className="flex-1">{artworksData[1].title}</p>
            </div>
            <div className="flex font-bold">
              <span className="flex-1 pr-2">
                {artworksData[0].artist_title}
              </span>
              <span className="flex-1">{artworksData[1].artist_title}</span>
            </div>
            <div className="relative flex mt-4">
              <div className="flex-1 pr-2">
                <div className="w-full p-4 bg-white aspect-square">
                  <img
                    src={imageUrls[0]}
                    alt="Artwork 1"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 m-auto text-center bg-white border-2 rounded-full w-16 h-16 leading-[4rem] border-yellow">
                <span className="m-auto font-bold">VS</span>
              </div>
              <div className="flex-1 pl-2">
                <div className="w-full p-4 bg-white aspect-square">
                  <img
                    src={imageUrls[1]}
                    alt="Artwork 2"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <span className="mt-4 font-bold text-center">
              Select your favourite Artwork
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;
