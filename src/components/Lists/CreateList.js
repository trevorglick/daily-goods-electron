import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { createList } from "../../utils/firebase/goods";

function CreateList({ emitListName }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    emitListName(value);
    createList(value);
    setValue("");
  };

  useEffect(() => {
    console.log("were in here");
  }, []);

  return (
    <form className="form form-generic" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="createlist" htmlFor="create-list">
          <FontAwesomeIcon icon={faClipboardList} />
        </label>
        <input
          id="create-list"
          type="text"
          className="form-input"
          value={value}
          placeholder="Create a New List"
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
        <button className="submit-form generic-fa-btn" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </form>
  );
}

export default CreateList;
