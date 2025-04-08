import React, { useState } from "react";
import "./cardStyle.css";
import { format } from "date-fns";
import {
  CompletedTask,
  deleteTask,
  setpriorityTask,
  updateTask,
} from "../../services/api";
import FormTask from "../form/FormTask";

// Interfaz para definir la estructura de una tarea
interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: number;
  isCompleted: boolean;
}

// Componente principal de la tarjeta
function Card({ task, fetchTasks }: { task: Task; fetchTasks: () => void }) {
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState<boolean>(false);

  // ============================
  // Funciones de Manejo de Eventos
  // ============================

  // Manejar la actualización de la tarea (abrir modal)
  const handleUpdate = () => {
    setShowModal(true); // Abre el modal
  };

  // Manejar el cambio de prioridad
  const handlePriority = async (updatedTask: Task) => {
    try {
      await setpriorityTask(task.id, updatedTask);
      alert("Priority updated successfully!");
      fetchTasks(); // Actualiza la lista de tareas
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  // Manejar el cambio de estado de completado
  const handleComplete = async () => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      await CompletedTask(task.id, updatedTask);
      alert("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Manejar la eliminación de la tarea
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmDelete) {
        await deleteTask(task.id);
        alert("Task deleted successfully!");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Formatear la fecha para mostrarla en un formato legible
  const formatDate = (dateString: Date | string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  // ============================
  // Renderizado del Componente
  // ============================

  return (
    <>
      {/* Tarjeta principal */}
      <div
        className={`card shadow-sm mb-4 ${
          task.isCompleted ? "border-success" : "border-danger"
        }`}
      >
        {/* Encabezado de la tarjeta */}
        <div className="card-header bg-light">
          <h5 className="card-title text-center mb-0">{task.name}</h5>
        </div>

        {/* Cuerpo de la tarjeta */}
        <div className="card-body">
          <p>
            <i className="bi bi-card-text"></i> <b>Description:</b>{" "}
            {task.description}
          </p>
          <p>
            <i className="bi bi-calendar-event"></i> <b>Due Date:</b>{" "}
            {formatDate(task.dueDate)}
          </p>
          <p>
            <i className="bi bi-flag"></i> <b>Priority:</b>{" "}
            {task.priority ?? "Not set"}
          </p>
          
          <p>
            <i
              className={`bi ${
                task.isCompleted
                  ? "bi-check-circle-fill text-success"
                  : "bi-x-circle-fill text-danger"
              }`}
            ></i>{" "}
            <b>Status:</b> {task.isCompleted ? "Completed" : "Pending"}
          </p>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Set Priority
          </label>
          <select
            className="form-select"
            value={task.priority}
            onChange={async (e) => {
              const updatedPriority = parseInt(e.target.value, 10);
              const updatedTask = {
                ...task,
                priority: updatedPriority,
              };
              handlePriority(updatedTask);
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Pie de la tarjeta con botones */}
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleComplete}
            disabled={task.isCompleted}
          >
            {task.isCompleted ? "Completed" : "Complete"}
          </button>
          <button className="btn btn-warning btn-sm" onClick={handleUpdate}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Modal de Edición */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Encabezado del modal */}
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Cuerpo del modal con el formulario */}
              <div className="modal-body">
                <FormTask
                  fetchTasks={() => {
                    fetchTasks();
                    setShowModal(false); // Cierra el modal después de guardar
                  }}
                  initialData={task} // Pasa los datos de la tarea al formulario
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
