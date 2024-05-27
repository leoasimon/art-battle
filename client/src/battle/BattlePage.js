import { useEffect, useState } from "react";
import useRandomArtworks from "../artworks/useRandomArtworks";
import SelectionModal from "./SelectionModal";
import { Link } from "react-router-dom";

function BattlePage() {
  const { status, imageUrls, artworksData, getArtworks } = useRandomArtworks();

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const selectArtwork = (index) => {
    setSelectedArtwork(index);
  };

  const cancelSelection = () => {
    setSelectedArtwork(null);
  };

  const handleModalClose = () => {
    getArtworks();
    setSelectedArtwork(null);
  };

  useEffect(() => {
    getArtworks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold">Battle</h1>
      <SelectionModal
        isOpen={selectedArtwork !== null}
        imageUrl={imageUrls[selectedArtwork]}
        artworkData={artworksData[selectedArtwork]}
        contestant={artworksData[selectedArtwork === 0 ? 1 : 0]}
        onCancel={cancelSelection}
        onClose={handleModalClose}
      />
      <div>
        {status === "loading" && <p className="mt-4">Loading...</p>}
        {status === "idle" && imageUrls.length > 0 && (
          <div className="flex flex-col mt-4">
            <div className="flex italic">
              <p className="flex-1 pr-2">{artworksData[0].title}</p>
              <p className="flex-1">{artworksData[1].title}</p>
            </div>
            <div className="flex font-bold">
              <Link
                to={`/artist/${artworksData[0].artist_id}`}
                className="flex-1 pr-2"
              >
                {artworksData[0].artist_title}
              </Link>
              <Link
                to={`/artist/${artworksData[1].artist_id}`}
                className="flex-1"
              >
                {artworksData[1].artist_title}
              </Link>
            </div>
            <div className="relative flex mt-4">
              <div className="flex-1 pr-2">
                <button
                  onClick={() => selectArtwork(0)}
                  className="w-full p-4 bg-white aspect-square"
                >
                  <img
                    src={imageUrls[0]}
                    alt="Artwork 1"
                    className="object-cover w-full h-full"
                  />
                </button>
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 m-auto text-center bg-white border-2 rounded-full w-16 h-16 leading-[4rem] border-yellow">
                <span className="m-auto font-bold">VS</span>
              </div>
              <div className="flex-1 pl-2">
                <button
                  onClick={() => selectArtwork(1)}
                  className="w-full p-4 bg-white aspect-square"
                >
                  <img
                    src={imageUrls[1]}
                    alt="Artwork 2"
                    className="object-cover w-full h-full"
                  />
                </button>
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
