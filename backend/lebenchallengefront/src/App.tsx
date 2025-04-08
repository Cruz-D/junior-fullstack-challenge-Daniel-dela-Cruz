import React, { useEffect, useState } from "react";
import FormTask from "./Components/form/FormTask";
import { getAllTasks } from "./services/api";
import "./App.css";
import Card from "./Components/card/card";
import Paginator from "./Components/paginator/paginator";
import Footer from "./Components/footer/footer";

// ============================
// Interfaz para definir la estructura de una tarea
// ============================
interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: number;
  isCompleted: boolean;
}

// ============================
// Componente principal de la aplicación
// ============================
function App() {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage] = useState<number>(4);

  // ============================
  // Efectos y funciones
  // ============================

  // Cargar las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas desde la API
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

  // ============================
  // Renderizado del componente
  // ============================
  return (
    <div className="container mt-5">
      {/* Título principal */}
      <h1 className="text-center mb-4 display-4 text-primary fw-bold">
        <i className="bi bi-check-circle-fill"></i> Task Manager
      </h1>

      <div className="row">
        {/* Formulario para crear tareas */}
        <div className="col-lg-4 col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
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

        {/* Paginador */}
        <div className="col-12">
          <Paginator
            tasks={tasks}
            tasksPerPage={tasksPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default App;