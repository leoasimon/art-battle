import { useState } from "react";
import useMatchup from "./useMatchup";

function SelectionModal({
  isOpen,
  artworkData,
  onCancel,
  onClose,
  contestant,
}) {
  const { playMatchup, status: matchupStatus } = useMatchup();

  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  const validateSelection = () => {
    if (artworkData === null || contestant === null) {
      return;
    }

    // Call the playMatchup function from useMatchup.js
    // with the selected artwork and the other artwork
    // that was not selected

    setSubmitted(true);
    playMatchup(artworkData.id, contestant.id, artworkData.id);
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-0 left-0 flex flex-col justify-center w-screen h-screen`}
    >
      <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
      {artworkData && (
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
      )}
    </div>
  );
}

export default SelectionModal;
