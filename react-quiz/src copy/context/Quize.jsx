import { createContext, useContext, useEffect, useReducer } from "react";

const QuizeContext = createContext();

const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //'loading','ready','error','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "timer":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function QuizeProvider({ children }) {
  const [
    { questions, status, answer, points, index, highscore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(
    function () {
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
    },
    [dispatch]
  );
  return (
    <QuizeContext.Provider
      value={{
        questions,
        status,
        answer,
        points,
        index,
        highscore,
        timer,
        dispatch,
      }}
    >
      {children}
    </QuizeContext.Provider>
  );
}

function useQuize() {
  const context = useContext(QuizeContext);
  return context;
}

export { QuizeProvider, useQuize };
