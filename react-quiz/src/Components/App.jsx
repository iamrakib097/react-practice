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
  const { status } = useQuize();

  return (
    <div className="app">
      <Header />
      <MainQ>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </MainQ>
    </div>
  );
}

export default App;
