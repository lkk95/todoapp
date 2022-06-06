import React, { useState } from "react";
import styled from "styled-components";

export default function AddForm({ addTask }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(name);
    setName("");
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
      <SubmitButton type="submit" value="Submit" />
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  gap: 2em;
  font-size: 1.15em;
`;

const SubmitButton = styled.input`
  height: 2.5em;
  padding: 0.5em;
  background-color: #3f4b3b;
  color: white;
  border: solid 0px #3f4b3b;
  border-radius: 0.3em;
`;
