import React from "react";
import "./paginatorStyle.css"; // Importa el archivo CSS para los estilos

// ============================
// Interfaz para las Props del Componente
// ============================
interface PaginatorProps {
  tasks: any[]; // Lista de tareas
  tasksPerPage: number; // Número de tareas por página
  setCurrentPage: (page: number) => void; // Función para cambiar la página actual
}

// ============================
// Componente Principal: Paginator
// ============================
const Paginator: React.FC<PaginatorProps> = ({
  tasks,
  tasksPerPage,
  setCurrentPage,
}) => {
  // ============================
  // Cálculo del Número Total de Páginas
  // ============================
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // ============================
  // Renderizado del Componente
  // ============================
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        
        {/* Generar botones para cada página */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)} // Cambiar a la página seleccionada
            >
              {index + 1} {/* Número de la página */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;