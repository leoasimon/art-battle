import { useEffect, useState } from "react";
import SelectionDialog from "./SelectionDialog";
import { fetchRandomArtworks } from "../artworks/artworksApi";
import ArtworkCard from "./ArtworkCard";
import { ArrowForwardIos } from "@mui/icons-material";
import BattlePayloadDialog from "./BattlePayloadDialog";

function BattlePage() {
  const [artFetchStatus, setArtFetchStatus] = useState("idle");
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [battlePayload, setBattlePayload] = useState(null);

  const nextBattle = () => {
    getContestants();
  }

  const selectArtwork = (index) => {
    setSelectedArtwork(index);
    setShowSelectionDialog(true);
  };

  const cancelSelection = () => {
    setSelectedArtwork(null);
    setShowSelectionDialog(false);
  };

  const onMatchupResult = (result) => {
    setShowSelectionDialog(false);
    setBattlePayload(result);
  };

  const handleModalClose = () => {
    setShowSelectionDialog(false);
  };

  const handleBattlePayloadClose = () => {
    setBattlePayload(null);
    setSelectedArtwork(null);
    nextBattle();
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
      <SelectionDialog
        show={showSelectionDialog}
        artworkData={artworks[selectedArtwork]}
        contestant={artworks[selectedArtwork === 0 ? 1 : 0]}
        onCancel={cancelSelection}
        handleClose={handleModalClose}
        handleMatchupResult={onMatchupResult}
      />
      <BattlePayloadDialog
        show={battlePayload !== null}
        handleClose={handleBattlePayloadClose}
        battlePayload={battlePayload}
        artwork={artworks[selectedArtwork]}
      />
      <div>
        {artFetchStatus === "loading" && <p className="mt-4">Loading...</p>}
        {artFetchStatus === "idle" && artworks.length > 0 && (
          <div>
            <h2 className="p-2 text-lg font-bold">
              Select your favourite Artwork!
            </h2>

            <div className="flex flex-col my-2 space-y-2">
              <ArtworkCard
                artwork={artworks[0]}
                handleSelect={() => selectArtwork(0)}
              />
              <ArtworkCard
                artwork={artworks[1]}
                handleSelect={() => selectArtwork(1)}
              />
            </div>

            <div className="p-2">
              <span className="font-bold">Can't decide?</span>
              <br />
              <button className="text-purple" onClick={nextBattle}>
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
