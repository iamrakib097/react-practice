function StartScreen({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quize</h2>
      <h3>{length} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
