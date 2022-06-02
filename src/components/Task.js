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
      {completed ? (
        <Button onClick={setComplete}>complete</Button>
      ) : (
        <Button onClick={setComplete}>uncomplete</Button>
      )}
      {completed ? (
        <Button onClick={deleteTask}>delete</Button>
      ) : (
        <Button onClick={archiveTask}>archive</Button>
      )}
    </TaskContainer>
  );
}

const TaskContainer = styled.section`
  height: 6em;
  width: 25em;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0 2em 0;
  padding: 1.5em;
  gap: 2em;
  background-color: ${(props) => (props.completed ? "#c65d52" : "#a2bba3")};
  border: solid 0 ${(props) => (props.completed ? "#c65d52" : "#a2bba3")};
  border-radius: 0.4em;
`;

const Button = styled.button`
  height: 2.5em;
  padding: 0.5em;
  background-color: black;
  color: white;
  border: solid 0px black;
  border-radius: 0.3em;
`;
