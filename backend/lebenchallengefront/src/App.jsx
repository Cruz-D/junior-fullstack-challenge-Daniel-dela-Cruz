import React from "react";
import { useEffect, useState } from "react";
import FormTask from "./Components/form/FormTask";
import { getAllTasks } from "./services/api";
import "./App.css";
import Card from "./Components/card/card";
import Paginator from "./Components/paginator/paginator";
import Footer from "./Components/footer/footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Calcular las tareas que se deben mostrar en la página actual
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4 display-4 text-primary fw-bold">
          <i className="bi bi-check-circle-fill"></i> Task Manager
        </h1>
        <div className="row">
          {/* Formulario */}
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">Create a New Task</h5>
                <FormTask fetchTasks={fetchTasks} />
              </div>
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="col-lg-8 col-md-7">
            <div className="row">
              {currentTasks.map((task) => (
                <div className="col-lg-6 col-md-12 mb-4" key={task.id}>
                  <Card task={task} fetchTasks={fetchTasks} />
                </div>
              ))}
            </div>
          </div>

          {/* Paginación */}
          <div className="col-12">
            <Paginator
              tasks={tasks}
              tasksPerPage={tasksPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <div className="col-12 mt-4">
        <Footer />
      </div>
    </>
  );
}

export default App;
