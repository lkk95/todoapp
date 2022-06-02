import React, { useState } from "react";
import styled from "styled-components";

export default function Form({ addTask }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(name);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="input-name">Add task:</label>
      <input
        id="input-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input type="submit" value="Submit" />
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  gap: 2em;
  font-size: 1.15em;
`;
