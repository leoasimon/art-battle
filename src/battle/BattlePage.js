import { useEffect, useState } from "react";
import SelectionModal from "./SelectionModal";
import { Link } from "react-router-dom";
import { fetchRandomArtworks } from "../artworks/artworksApi";
import ArtworkCard from "./ArtworkCard";
import { ArrowForwardIos } from "@mui/icons-material";

function BattlePage() {
  const [artFetchStatus, setArtFetchStatus] = useState("idle");
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const selectArtwork = (index) => {
    setSelectedArtwork(index);
  };

  const cancelSelection = () => {
    setSelectedArtwork(null);
  };

  const handleModalClose = () => {
    getContestants();
    setSelectedArtwork(null);
  };

  const getContestants = async () => {
    setArtFetchStatus("loading");
    const data = await fetchRandomArtworks(2);
    setArtworks(data);
    setArtFetchStatus("idle");
  };

  useEffect(() => {
    getContestants();
  }, []);

  return (
    <div className="p-2 text-black">
      <h1 className="p-2 text-2xl font-bold">Battle</h1>
      <SelectionModal
        isOpen={selectedArtwork !== null}
        artworkData={artworks[selectedArtwork]}
        contestant={artworks[selectedArtwork === 0 ? 1 : 0]}
        onCancel={cancelSelection}
        onClose={handleModalClose}
      />
      <div>
        {artFetchStatus === "loading" && <p className="mt-4">Loading...</p>}
        {artFetchStatus === "idle" && artworks.length > 0 && (
          // <div className="flex flex-col mt-4">
          //   <div className="flex font-bold">
          //     <p className="flex-1 pr-2">
          //       {artworks[0].title}, {artworks[0].date_display}
          //     </p>
          //     <p className="flex-1">
          //       {artworks[1].title}, {artworks[1].date_display}
          //     </p>
          //   </div>
          //   <div className="flex">
          //     {artworks[0].artist_title ? (
          //       <Link
          //         to={`/artist/${artworks[0].artist_id}`}
          //         className="flex-1 pr-2"
          //       >
          //         {artworks[0].artist_title}
          //       </Link>
          //     ) : (
          //       <span className="flex-1 pr-2">Unknown</span>
          //     )}
          //     {artworks[1].artist_title ? (
          //       <Link
          //         to={`/artist/${artworks[1].artist_id}`}
          //         className="flex-1"
          //       >
          //         {artworks[1].artist_title}
          //       </Link>
          //     ) : (
          //       <span className="flex-1">Unknown</span>
          //     )}
          //   </div>
          //   <div className="relative flex mt-4">
          //     <div className="flex-1 pr-2">
          //       <button
          //         onClick={() => selectArtwork(0)}
          //         className="w-full p-4 bg-white aspect-square"
          //       >
          //         <img
          //           src={artworks[0].image_url}
          //           alt="Artwork 1"
          //           className="object-cover w-full h-full"
          //         />
          //       </button>
          //     </div>
          //     <div className="absolute top-0 bottom-0 left-0 right-0 m-auto text-center bg-white border-2 rounded-full w-16 h-16 leading-[4rem] border-yellow">
          //       <span className="m-auto font-bold">VS</span>
          //     </div>
          //     <div className="flex-1 pl-2">
          //       <button
          //         onClick={() => selectArtwork(1)}
          //         className="w-full p-4 bg-white aspect-square"
          //       >
          //         <img
          //           src={artworks[1].image_url}
          //           alt="Artwork 2"
          //           className="object-cover w-full h-full"
          //         />
          //       </button>
          //     </div>
          //   </div>
          //   <span className="mt-4 font-bold text-center">
          //     Select your favourite Artwork
          //   </span>
          // </div>
          <div>
            <h2 className="p-2 text-lg font-bold">
              Select your favourite Artwork!
            </h2>

            <div className="flex flex-col my-2 space-y-2">
              <ArtworkCard artwork={artworks[0]} />
              <ArtworkCard artwork={artworks[1]} />
            </div>

            <div className="p-2">
              <span className="font-bold">Can't decide?</span>
              <br />
              <button className="text-purple">
                <span>Move on to the next battle</span>
                <ArrowForwardIos />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;
