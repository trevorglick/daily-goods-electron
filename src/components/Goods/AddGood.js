import React, { useState, useEffect, useRef } from "react";
import { addGood } from "../../utils/firebase/actions";

function AddGood({ listInfo }) {
  const [list, setList] = useState("");
  const [value, setValue] = useState("");
  const [monitor, setMonitor] = useState("");

  const previousListRef = useRef(listInfo);
  useEffect(() => {
    if (previousListRef.current !== listInfo) {
      if (listInfo.length !== 0) {
        setList(listInfo);
        previousListRef.current = listInfo;
      }
    }
  }, [listInfo, monitor]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    setMonitor(value);
    addGood(value, list.name, list.stuff.length);
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
