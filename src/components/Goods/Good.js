import React from "react";

function Good({ good, goodAcquiredByUniqueId, removeGoodByUniqueID }) {
  return (
    <div
      className="good"
      style={{ textDecoration: good.acquired ? "line-through" : "" }}
    >
      {good.name}
      <button
        style={{ background: "red" }}
        onClick={() => removeGoodByUniqueID(good.uniqueId)}
      >
        x
      </button>
      <button onClick={() => goodAcquiredByUniqueId(good.uniqueId)}>
        Acquired
      </button>
    </div>
  );
}

export default Good;
