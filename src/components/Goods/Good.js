import React from "react";

function Good({ good, index, goodAcquired, removeGood }) {
  return (
    <div
      className="good"
      style={{ textDecoration: good.acquired ? "line-through" : "" }}
    >
      {good.name}
      <button style={{ background: "red" }} onClick={() => removeGood(index)}>
        x
      </button>
      <button onClick={() => goodAcquired(index)}>Acquired</button>
    </div>
  );
}

export default Good;
