import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Task from "./components/Task.js";
import TaskBlank from "./components/TaskBlank.js";
import Footer from "./components/Footer.js";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [tasks, setTasks] = useLocalStorage("current-tasks", []);
  const [random, setRandom] = useState(0);

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

  function randomTasks() {
    const randomTask = Math.floor(Math.random() * tasks.length);
    setRandom(randomTask);
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
              <button
                onClick={() => {
                  randomTasks();
                }}
              >
                Shuffle
              </button>
              <section>
                <Task
                  key={tasks[random].id}
                  name={tasks[random].name}
                  completed={tasks[random].completed}
                  setComplete={() => setComplete(tasks[random].id)}
                  archived={tasks[random].archived}
                  deleteTask={() => deleteTask(tasks[random].id)}
                  archiveTask={() => archiveTask(tasks[random].id)}
                />
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
