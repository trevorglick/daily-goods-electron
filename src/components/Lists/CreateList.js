import React, { useState } from "react";
import { createList } from "../../utils/firebase/actions";

function CreateList({ emitListName }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    emitListName(value);
    createList(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Create a New List"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default CreateList;
