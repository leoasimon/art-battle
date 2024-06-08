import { useState } from "react";
import { playMatchup } from "./battleApi";
import { Close } from "@mui/icons-material";

function SelectionDialog({
  show,
  artworkData,
  onCancel,
  handleClose,
  contestant,
}) {
  const [matchupStatus, setMatchupStatus] = useState("idle");

  const [submitted, setSubmitted] = useState(false);

  const showHideClassName = show ? "block" : "hidden";

  const onClose = () => {
    handleClose();
    setSubmitted(false);
  };

  const handleMatchup = () => {
    setMatchupStatus("loading");
    playMatchup(artworkData.id, contestant.id, artworkData.id).then(() => {
      setMatchupStatus("idle");
    });
  };

  const validateSelection = () => {
    if (artworkData === null || contestant === null) {
      return;
    }

    // Call the playMatchup function from matchupApi.js
    // with the selected artwork and the other artwork
    // that was not selected

    setSubmitted(true);
    handleMatchup();
  };

  return (
    <div
      className={`${showHideClassName} fixed inset-0 z-50 min-h-screen bg-white flex flex-col`}
    >
      <div className="flex justify-end p-2">
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      {artworkData && (
        <div className="flex flex-col justify-between">
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
      {/* {artworkData && (
        <div className="relative z-20 flex flex-col p-8 m-auto bg-white rounded-lg shadow-md w-96">
          <span className="text-center">You selected</span>
          <div className="mt-4">
            <span className="block italic">{artworkData.title}</span>
            <span className="block font-bold">{artworkData.artist_title}</span>
          </div>
          <img
            src={artworkData.image_url}
            alt="Selected artwork"
            className="object-cover w-full mt-4 aspect-square"
          />
          {matchupStatus === "idle" && !submitted && (
            <div className="flex justify-between mt-4">
              <button
                className="w-32 h-12 font-bold text-white bg-blue"
                onClick={validateSelection}
              >
                Submit
              </button>
              <button
                className="w-32 h-12 font-bold text-white bg-danger"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          )}
          {matchupStatus === "idle" && !!submitted && (
            <div className="flex justify-center mt-4">
              <button
                className="w-32 h-12 font-bold text-white bg-blue"
                onClick={handleClose}
              >
                Next battle
              </button>
            </div>
          )}
        </div>
      )} */}

      <div className="flex flex-col justify-end flex-1 p-2 my-8">
        <div className="flex justify-between">
          <button className="w-40 h-14 bg-purple/20">Go Back</button>
          <button className="w-40 text-white h-14 bg-purple">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default SelectionDialog;
