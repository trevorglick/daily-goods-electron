import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faCheckSquare,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";

function Good({ good, goodAcquiredByUniqueId, removeGoodByUniqueID }) {
  return (
    <li>
      <div className="list">
        <div
          className="list-item"
          style={{ textDecoration: good.acquired ? "line-through" : "" }}
          onClick={() => goodAcquiredByUniqueId(good.uniqueId)}
        >
          {good.acquired ? (
            <FontAwesomeIcon className="list-item-icon" icon={faCheckSquare} />
          ) : (
            <FontAwesomeIcon className="list-item-icon" icon={faSquare} />
          )}
          <div className="list-item-name">{good.name}</div>
        </div>
        <button
          className="generic-fa-btn list-item-remove"
          onClick={() => removeGoodByUniqueID(good.uniqueId)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </li>
  );
}

export default Good;
