import React from "react";

function List({ list, index, deleteListByIndex }) {
  return (
    <div className="list">
      {list.name}
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
