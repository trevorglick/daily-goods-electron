import React, { useState } from "react";

function AddGood({ addGood }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    addGood(value);
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
