import React from "react";

function List({ list, index, deleteListByIndex, selectList }) {
  return (
    <div className="list">
      <div
        style={{ display: "inline", cursor: "pointer" }}
        onClick={() => selectList(index)}
      >
        {list.name}
      </div>
      <button
        style={{ background: "red" }}
        onClick={() => deleteListByIndex(index)}
      >
        X
      </button>
    </div>
  );
}

export default List;
