import styled from "styled-components";

export default function Task({
  name,
  completed,
  archived,
  setComplete,
  setArchive,
}) {
  return (
    <TaskContainer
      style={completed ? { background: "red" } : { background: "green" }}
    >
      <p>{name}</p>
      <Button
        onClick={() => {
          setComplete(!completed);
        }}
      >
        {completed ? "complete" : "uncomplete"}
      </Button>
      <Button onClick={setArchive}>{completed ? "delete" : "archived"}</Button>
    </TaskContainer>
  );
}

const TaskContainer = styled.section`
  height: 4em;
  width: 20em;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0 2em 0;
  gap: 2em;
`;

const Button = styled.button`
  height: 2em;
`;
