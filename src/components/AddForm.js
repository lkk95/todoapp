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
  align-items: center;
  gap: 2em;
  font-size: 1.15em;
  margin-bottom: 2em;
  input {
    width: 16em;
    height: 2.5em;
  }
`;

const SubmitButton = styled.input`
  height: 2.5em;
  padding: 0.5em;
  background-color: #2e2d4d;
  color: white;
  border: solid 0px #3f4b3b;
  border-radius: 0.3em;
`;
