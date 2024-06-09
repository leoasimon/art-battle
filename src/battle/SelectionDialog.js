import { useState } from "react";
import { playMatchup } from "./battleApi";
import { Close } from "@mui/icons-material";

function SelectionDialog({
  show,
  artworkData,
  handleClose,
  handleMatchupResult,
  contestant,
}) {
  const [matchupStatus, setMatchupStatus] = useState("idle");

  const showHideClassName = show ? "block" : "hidden";

  const handleMatchup = () => {
    setMatchupStatus("loading");
    playMatchup(artworkData.id, contestant.id, artworkData.id).then(
      (result) => {
        setMatchupStatus("idle");
        handleMatchupResult(result);
      }
    );
  };

  const validateSelection = () => {
    if (artworkData === null || contestant === null) {
      return;
    }

    // Call the playMatchup function from matchupApi.js
    // with the selected artwork and the other artwork
    // that was not selected

    handleMatchup();
  };

  return (
    <div
      className={`${showHideClassName} fixed inset-0 z-50 min-h-screen bg-white flex flex-col`}
    >
      <div className="fixed flex justify-end w-full p-4">
        <button onClick={handleClose}>
          <Close fontSize="large" />
        </button>
      </div>
      {artworkData && (
        <div className="flex flex-col justify-between mt-8">
          <div>
            <div className="p-2">
              <h1 className="mb-8 text-2xl font-bold">Confirm your vote?</h1>
              <div className="flex flex-col font-serif text-md">
                <span className="font-bold">
                  {artworkData.title}, {artworkData.date_display}
                </span>
                <span className="">{artworkData.artist_title}</span>
              </div>
            </div>
            <img
              className="object-cover w-full aspect-square"
              src={artworkData.image_url}
              alt="Selected artwork"
            />
            <div className="p-2">
              <span>The Art Institute of Chicago</span>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 flex flex-col justify-end w-full px-2 my-4">
        {matchupStatus === "idle" && (
          <div className="flex justify-between">
            <button className="w-40 h-14 bg-purple/20" onClick={handleClose}>
              GO BACK
            </button>
            <button
              className="w-40 text-white h-14 bg-purple"
              onClick={validateSelection}
            >
              CONFIRM
            </button>
          </div>
        )}
        {matchupStatus === "loading" && (
          <div className="flex justify-center">
            <span className="text-md">Processing matchup...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionDialog;
