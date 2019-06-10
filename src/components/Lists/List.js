import React from "react";

function List({ list, index, deleteListByIndex, retrieveListItems }) {
  return (
    <div className="list">
      <div
        style={{ display: "inline", cursor: "pointer" }}
        onClick={() => retrieveListItems(index)}
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
