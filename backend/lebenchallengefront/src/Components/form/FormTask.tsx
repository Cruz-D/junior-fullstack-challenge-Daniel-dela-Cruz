import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../../services/api";

// ============================
// Interfaz para las Props del Componente
// ============================
interface FormTaskProps {
  fetchTasks: () => void; // Función para actualizar la lista de tareas
  initialData?: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
  }; // Datos iniciales para editar una tarea
}

// ============================
// Componente Principal: FormTask
// ============================
const FormTask: React.FC<FormTaskProps> = ({ fetchTasks, initialData }) => {
  
  // ============================
  // Estados del Componente
  // ============================
  const [name, setName] = useState<string>(initialData?.name || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [dueDate, setDueDate] = useState<string>(initialData?.dueDate || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ============================
  // Efectos
  // ============================
  // Actualizar los estados si se reciben datos iniciales
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  // ============================
  // Funciones
  // ============================

  // Manejar el envío del formulario
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos
    if (!name || !description || !dueDate) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const task = { name, description, dueDate };

    try {
      if (initialData) {
        // Actualizar tarea existente
        await updateTask(initialData.id, task);
        alert("Task updated successfully!");
      } else {
        // Crear nueva tarea
        await createTask(task);
        alert("Task created successfully!");
      }
      fetchTasks(); // Actualizar la lista de tareas
    } catch (error) {
      console.error("Error saving task:", error);
      setError("Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Renderizado del Componente
  // ============================
  return (
    <form onSubmit={handlesubmit} className="form-container">
      {/* Título del formulario */}
      <h3 className="text-center mb-4">{initialData ? "Edit Task" : "Create Task"}</h3>

      {/* Mensaje de error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Campo: Nombre */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
        />
      </div>

      {/* Campo: Descripción */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        ></textarea>
      </div>

      {/* Campo: Fecha de vencimiento */}
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
};

export default FormTask;