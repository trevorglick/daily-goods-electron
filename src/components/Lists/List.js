import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function List({ list, index, deleteListByIndex, selectList }) {
  return (
    <li>
      <div className="list">
        <div className="list-item" onClick={() => selectList(index)}>
          <FontAwesomeIcon className="list-item-icon" icon={faClipboardList} />
          <div className="list-item-name">{list.name}</div>
        </div>
        <button
          className="generic-fa-btn list-item-remove"
          onClick={() => deleteListByIndex(index)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <hr className="list-separator" />
    </li>
  );
}

export default List;
