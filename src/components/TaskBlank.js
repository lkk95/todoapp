import styled from "styled-components";

export default function TaskBlank({ name, completed }) {
  return (
    <TaskContainer completed={completed}>
      <p>{name}</p>
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
  background-color: ${(props) => (props.completed ? "#7EA172" : "#FC7A57")};
  border: solid 0 ${(props) => (props.completed ? "#7EA172" : "#FC7A57")};
  border-radius: 0.4em;
`;
