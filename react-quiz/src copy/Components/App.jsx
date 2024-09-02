import { useEffect, useReducer } from "react";
import Header from "./Header.jsx";
import MainQ from "./MainQ.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import { QuizeProvider, useQuize } from "../context/Quize.jsx";

function App() {
  const {
    questions,
    status,
    answer,
    points,
    index,
    highscore,
    timer,
    dispatch,
  } = useQuize();
  const numberQuestion = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    async function fetchData() {
      try {
        let res = await fetch("http://localhost:333/questions");
        let data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <MainQ>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberQuestion={numberQuestion}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
              numberQuestion={numberQuestion}
              timer={timer}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainQ>
    </div>
  );
}

export default App;
