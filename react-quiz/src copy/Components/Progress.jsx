function Progress({ index, numberQuestion, points, totalPoints, answer }) {
  return (
    <div className="progress">
      <progress
        max={numberQuestion}
        value={answer ? index + 1 : index}
      ></progress>
      <p>
        <strong>{index + 1}/</strong>
        {numberQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </div>
  );
}

export default Progress;
