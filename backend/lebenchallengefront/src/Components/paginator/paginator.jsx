import React from 'react';
import './paginatorStyle.css'; // Importa el archivo CSS para los estilos

const Paginator = ({ tasks, tasksPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;