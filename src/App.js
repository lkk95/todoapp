import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Task from "./components/Task.js";

function App() {
  const [tasks, setTasks] = useState();

  const allTasks = [
    {
      id: nanoid(),
      name: "Wash dishes",
      completed: true,
      archived: false,
    },
    {
      id: nanoid(),
      name: "Wash dishes",
      completed: false,
      archived: false,
    },
    {
      id: nanoid(),
      name: "Wash dishes",
      completed: false,
      archived: false,
    },
  ];

  function switchComplete(id, newValue) {}

  return (
    <AppContainer>
      <Header />
      <Form />
      <section>
        {allTasks.map((task) => {
          return (
            <Task
              key={task.id}
              name={task.name}
              completed={task.completed}
              switchComplete={(newValue) => switchComplete(task.id, newValue)}
              archived={task.archived}
            />
          );
        })}
      </section>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
