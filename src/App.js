import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Task from "./components/Task.js";

function App() {
  const [tasks, setTasks] = useState([
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
  ]);

  function setComplete(id, newValue) {
    const completedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: newValue };
      } else {
        return task;
      }
    });
    setTasks(completedTasks);
  }

  function deleteTask(id) {
    const archivedTasks = tasks.filter((task) => task.id !== id);
    setTasks(archivedTasks);
  }

  function addTask(name) {
    const newTasks = [
      ...tasks,
      { id: nanoid(), name: name, completed: false, archived: false },
    ];
    setTasks(newTasks);
  }

  return (
    <AppContainer>
      <Header />
      <Form addTask={addTask} />
      <section>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              name={task.name}
              completed={task.completed}
              setComplete={(newValue) => setComplete(task.id, newValue)}
              archived={task.archived}
              setArchive={() => deleteTask(task.id)}
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
