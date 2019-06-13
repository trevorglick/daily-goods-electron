import React, { useState, useEffect, useRef } from "react";
import { addGood } from "../../utils/firebase/actions";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a good"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default AddGood;
