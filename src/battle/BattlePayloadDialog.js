import { ArrowForward, Close } from "@mui/icons-material";

function BattlePayloadDialog({ battlePayload, handleClose, show, artwork }) {
  const showHideClassName = show ? "block" : "hidden";

  const { beforeBattle, afterBattle } = battlePayload || {};
  const { rank: rankBeforeBattle, score: scoreBeforeBattle = 0 } =
    beforeBattle || {};
  return (
    <div
      className={`${showHideClassName} fixed inset-0 z-50 flex items-center justify-center h-screen bg-black/25`}
      onClick={handleClose}
    >
      <div
        className="w-10/12 p-4 bg-white shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end w-full p-2">
          <button onClick={handleClose}>
            <Close fontSize="large" />
          </button>
        </div>
        {artwork && battlePayload && (
          <div className="flex flex-col my-8 space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Thanks for your vote!
            </h1>
            <h2 className="text-xl">
              You helped "<span className="font-serif italic">{artwork.title}</span>" climb up the ranking ladder.
            </h2>
            <div className="flex m-auto space-x-4 text-bold">
              <div className="flex flex-col items-end">
                <span className="text-xl font-bold">
                  Rank: {rankBeforeBattle || "-"} <ArrowForward /> {afterBattle.rank}
                </span>
                <span className="text-xl font-bold">
                  Score: {scoreBeforeBattle} <ArrowForward /> {afterBattle.score}
                </span>
              </div>
              <div className="flex flex-col px-2 text-green">
                <span className="text-xl font-bold">
                  +
                  {rankBeforeBattle
                    ? rankBeforeBattle - afterBattle.rank
                    : afterBattle.rank}
                </span>
                <span className="text-xl font-bold">
                  +{afterBattle.score - scoreBeforeBattle}
                </span>
              </div>
            </div>
            {/* <pre className="text-sm">
              {JSON.stringify(battlePayload, null, 2)}
            </pre> */}
          </div>
        )}

        <div className="flex justify-center p-2">
          <button className="w-40 text-white h-14 bg-purple" onClick={handleClose}>
            NEXT BATTLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default BattlePayloadDialog;
