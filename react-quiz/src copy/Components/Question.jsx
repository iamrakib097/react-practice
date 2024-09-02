import { useEffect } from "react";
import Option from "./Option";
function Question({
  question,
  dispatch,
  answer,
  index,
  numberQuestion,
  timer,
}) {
  let min = Math.floor(timer / 60);
  let sec = timer - min * 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
      <div className="timer">
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </div>
      {index < numberQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {index === numberQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Result
        </button>
      )}
    </div>
  );
}

export default Question;
