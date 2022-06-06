import styled from "styled-components";
import { useState } from "react";

export default function Task({
  name,
  completed,
  created,
  edited,
  archived,
  setComplete,
  deleteTask,
  archiveTask,
  editTask,
}) {
  const [editing, setEditing] = useState(false);

  const [newname, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    editTask(newname);
    setEditing(!editing);
  };

  return (
    <section>
      {editing ? (
        <TaskContainer completed={completed}>
          <form onSubmit={handleSubmit}>
            <input
              id="input-newname"
              type="text"
              value={newname}
              onChange={(event) => setNewName(event.target.value)}
            />
            <SaveButton type="submit" value="Save" />
            <Button onClick={() => setEditing(!editing)}>Cancel</Button>
          </form>
        </TaskContainer>
      ) : (
        <TaskContainer completed={completed}>
          <p>{name}</p>
          <Date>Created: {created}</Date>
          <Date>Edited: {edited}</Date>
          <Buttons archived={archived}>
            {completed ? (
              <Button onClick={setComplete}>Uncomplete</Button>
            ) : (
              <Button onClick={setComplete}>Complete</Button>
            )}
            {completed ? (
              ""
            ) : (
              <Button onClick={() => setEditing(!editing)}>Edit</Button>
            )}
            {completed ? (
              <Button onClick={archiveTask}>Archive</Button>
            ) : (
              <Button onClick={deleteTask}>Delete</Button>
            )}
          </Buttons>
        </TaskContainer>
      )}
    </section>
  );
}

const TaskContainer = styled.section`
  height: 6em;
  width: 35em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0 2em 0;
  padding: 1.5em;
  gap: 2em;
  background-color: ${(props) => (props.completed ? "#7EA172" : "#FC7A57")};
  border: solid 0 ${(props) => (props.completed ? "#7EA172" : "#FC7A57")};
  border-radius: 0.4em;
`;

const Button = styled.button`
  height: 2.5em;
  padding: 0.5em;
  background-color: #3f4b3b;
  color: white;
  border: solid 0px #3f4b3b;
  border-radius: 0.3em;
`;

const Date = styled.p`
  font-size: 0.5rem;
`;

const Buttons = styled.section`
  display: ${(props) => (props.archived ? "none" : "flex")};
`;

const SaveButton = styled.input`
  height: 2.5em;
  padding: 0.5em;
  background-color: #3f4b3b;
  color: white;
  border: solid 0px #3f4b3b;
  border-radius: 0.3em;
`;
