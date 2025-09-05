import React from 'react';
import Button from './Button';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // No renderiza el componente si solo hay una página o menos
  if (totalPages <= 1) {
    return null;
  }

  // Define cuántos botones de página se mostrarán alrededor de la página actual
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    // Si el total de páginas es menor que el límite, muestra todas las páginas
    startPage = 1;
    endPage = totalPages;
  } else {
    // De lo contrario, calcula el rango de páginas a mostrar
    startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Ajusta el inicio si el final está en el límite
    if (endPage === totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }
  }

  const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Botón para ir al principio */}
      <Button 
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <i className="bi bi-chevron-bar-left"></i>
      </Button>

      {/* Botón para la página anterior */}
      <Button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="bi bi-chevron-left"></i>
      </Button>

      {/* Indicador de elipsis al inicio si es necesario */}
      {startPage > 1 && (
        <span className="text-gray-600 dark:text-gray-400">...</span>
      )}

      {/* Botones para cada página en el rango */}
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${currentPage === page ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {page}
        </Button>
      ))}

      {/* Indicador de elipsis al final si es necesario */}
      {endPage < totalPages && (
        <span className="text-gray-600 dark:text-gray-400">...</span>
      )}

      {/* Botón para la página siguiente */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="bi bi-chevron-right"></i>
      </Button>

      {/* Botón para ir al final */}
      <Button 
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <i className="bi bi-chevron-bar-right"></i>
      </Button>
    </div>
  );
};

export default Pagination;