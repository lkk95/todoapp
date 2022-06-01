import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Task from "./components/Task.js";
import TaskBlank from "./components/TaskBlank.js";
import Footer from "./components/Footer.js";
import { Routes, Route } from "react-router-dom";

function useLocalStorage(key, defaultState) {
  const [state, setState] = useState(() => {
    try {
      const persistedData = localStorage.getItem(key);
      if (persistedData) {
        return JSON.parse(persistedData);
      }
      return defaultState;
    } catch (error) {
      console.warn("Reading from local storage failed", error);
      return defaultState;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("Writing to local storage failed", error);
    }
  }, [state]);

  return [state, setState];
}

function App() {
  const [tasks, setTasks] = useLocalStorage("current-tasks", []);

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

  function randomTasks(tasks) {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks.filter((task, index) => index === randomIndex);
    setTasks(randomTask);
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
                      <TaskBlank
                        key={task.id}
                        name={task.name}
                        completed={task.completed}
                      />
                    );
                  })}
              </section>
            </>
          }
        />
        <Route
          path="/random"
          element={
            <>
              <button onClick={randomTasks}>Shuffle</button>
              <section>
                {tasks.map((task) => {
                  return (
                    <TaskBlank
                      key={task.id}
                      name={task.name}
                      completed={task.completed}
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
