function FullScreenImageOverlay({ url, handleClose, show }) {

  const showHideClassName = show ? "block" : "hidden";
  return (
    <div
      className={`${showHideClassName} fixed inset-0 z-50 flex items-center justify-center h-screen bg-black`}
      onClick={handleClose}
    >
      <img
        src={url}
        alt="Artwork"
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
}

export default FullScreenImageOverlay;