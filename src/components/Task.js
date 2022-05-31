import styled from "styled-components";

export default function Task({
  name,
  completed,
  setComplete,
  deleteTask,
  archiveTask,
}) {
  return (
    <TaskContainer completed={completed}>
      <p>{name}</p>
      <Button onClick={setComplete}>
        {completed ? "complete" : "uncomplete"}
      </Button>
      <Button onClick={completed ? archiveTask : deleteTask}>
        {completed ? "delete" : "archive"}
      </Button>
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
  background-color: ${(props) => (props.completed ? "red" : "green")};
`;

const Button = styled.button`
  height: 2em;
`;
