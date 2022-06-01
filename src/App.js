import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Footer from "./components/Footer.js";
import { Routes, Route } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState(() => {
    const currentTasks = localStorage.getItem("current-tasks");
    if (currentTasks) {
      return JSON.parse(currentTasks);
    } else {
      return [];
    }
  });

  /* useEffect(() => {
    localStorage.setItem("current-tasks", JSON.stringify(tasks));
  }, [tasks]);*/

  console.log(tasks);

  function setComplete(id) {
    const completedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(completedTasks);
    localStorage.setItem("current-tasks", JSON.stringify(completedTasks));
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
    localStorage.setItem("current-tasks", JSON.stringify(archivedTasks));
  }

  function deleteTask(id) {
    const deletedTasks = tasks.filter((task) => task.id !== id);
    setTasks(deletedTasks);
    localStorage.setItem("current-tasks", JSON.stringify(deletedTasks));
  }

  function addTask(name) {
    const newTasks = [
      ...tasks,
      { id: nanoid(), name: name, completed: false, archived: false },
    ];
    setTasks(newTasks);
    localStorage.setItem("current-tasks", JSON.stringify(newTasks));
  }

  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route
          path="/archived"
          element={
            <>
              <section>
                {tasks
                  .filter((task) => task.archived)
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
            </>
          }
        />
      </Routes>
      <Footer />
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
