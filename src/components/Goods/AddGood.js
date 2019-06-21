import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addGood } from "../../utils/firebase/goods";

function AddGood({ listInfo, emitGoodName }) {
  const [list, setList] = useState("");
  const [value, setValue] = useState("");

  const previousListRef = useRef(listInfo);
  useEffect(() => {
    if (previousListRef.current !== listInfo) {
      if (listInfo.hasOwnProperty("name")) {
        setList(listInfo);
        previousListRef.current = listInfo;
      }
    }
  }, [listInfo]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    if (!list.name) return;

    emitGoodName(value);
    addGood(value, list.name);
    setValue("");
  };

  return (
    <form className="form form-generic" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="addGood" htmlFor="add-good">
          <FontAwesomeIcon icon={faGifts} />
        </label>
        <input
          id="add-good"
          type="text"
          className="form-input"
          value={value}
          placeholder="Add a good"
          onChange={e => setValue(e.target.value)}
        />
        <button className="submit-form generic-fa-btn" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </form>
  );
}

export default AddGood;
