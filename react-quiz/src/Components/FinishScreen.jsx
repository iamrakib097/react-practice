import { useQuize } from "../context/Quize";

function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuize();
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} out of {totalPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High Score : {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
