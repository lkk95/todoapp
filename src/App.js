import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import AddForm from "./components/AddForm.js";
import Task from "./components/Task.js";
import Footer from "./components/Footer.js";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [tasks, setTasks] = useLocalStorage("current-tasks", []);
  const [random, setRandom] = useState({});

  function setComplete(id) {
    const completedTasks = tasks.map((random) => {
      if (random.id === id) {
        return { ...random, completed: !random.completed };
      } else {
        return random;
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
    const deletedTasks = tasks.filter((random) => random.id !== id);
    setTasks(deletedTasks);
  }

  function addTask(name) {
    let currentDate = new Date();
    const createdate =
      currentDate.getDate() +
      "." +
      (currentDate.getMonth() + 1) +
      "." +
      currentDate.getFullYear();
    const newTasks = [
      ...tasks,
      {
        id: nanoid(),
        name,
        completed: false,
        archived: false,
        created: createdate,
      },
    ];
    setTasks(newTasks);
  }

  function editTask(id, newname) {
    let currentDate = new Date();
    const editdate =
      currentDate.getDate() +
      "." +
      (currentDate.getMonth() + 1) +
      "." +
      currentDate.getFullYear();
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newname, edited: editdate };
      } else {
        return task;
      }
    });
    setTasks(editedTasks);
  }

  function randomTasks() {
    const filteredTasks = tasks.filter((task) => !task.archived);
    const randomIndex = Math.floor(Math.random() * filteredTasks.length);
    const randomTask = filteredTasks[randomIndex];
    setRandom(randomTask);
  }

  function ErrorFallback() {
    return (
      <div role="alert">
        <p>Something went wrong: Please try again!</p>
      </div>
    );
  }

  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddForm addTask={addTask} />
              <section>
                {tasks
                  .filter((task) => !task.archived)
                  .map((task) => {
                    return (
                      <Task
                        key={task.id}
                        name={task.name}
                        created={task.created}
                        edited={task.edited}
                        completed={task.completed}
                        setComplete={() => setComplete(task.id)}
                        archived={task.archived}
                        deleteTask={() => deleteTask(task.id)}
                        archiveTask={() => archiveTask(task.id)}
                        editTask={(newname) => editTask(task.id, newname)}
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
                        created={task.created}
                        edited={task.edited}
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
          path="/random"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Button
                onClick={() => {
                  randomTasks();
                }}
              >
                Shuffle
              </Button>
              <section>
                {Object.keys(random).length === 0 ? (
                  "Please use the shuffle button to get your random ToDo!"
                ) : (
                  <Task
                    key={random.id}
                    name={random.name}
                    created={random.created}
                    edited={random.edited}
                    completed={random.completed}
                    setComplete={() => setComplete(random.id)}
                    archived={random.archived}
                    deleteTask={() => deleteTask(random.id)}
                    archiveTask={() => archiveTask(random.id)}
                    editTask={(newname) => editTask(random.id, newname)}
                  />
                )}
              </section>
            </ErrorBoundary>
          }
        />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10em 0 10em 0;
`;

const Button = styled.button`
  height: 2.5em;
  padding: 0.5em;
  background-color: #3f4b3b;
  color: white;
  border: solid 0px #3f4b3b;
  border-radius: 0.3em;
`;
