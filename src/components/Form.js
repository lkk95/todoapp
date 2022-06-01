import React, { useState } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-name">Add task:</label>
      <input
        id="input-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
