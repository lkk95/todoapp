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
      archived: true,
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

  function setComplete(id) {
    const completedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(completedTasks);
  }

  function archiveTask(id) {
    const archivedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, archived: !task.archived };
      } else {
        return task;
      }
    });
    setTasks(archivedTasks);
  }

  function deleteTask(id) {
    const deletedTasks = tasks.filter((task) => task.id !== id);
    setTasks(deletedTasks);
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
        {tasks
          .filter((task) => !task.archived)
          .map((task) => {
            return (
              <Task
                key={task.id}
                name={task.name}
                completed={task.completed}
                setComplete={() => setComplete(task.id)}
                archived={task.archived}
                deleteTask={() => deleteTask(task.id)}
                archiveTask={() => archiveTask(task.id)}
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
