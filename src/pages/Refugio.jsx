import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RefugioList from '../components/RefugioList';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import { useRefugios } from '../hook/useRefugios';
import { AuthContext } from '../context/AuthContext';
import { can } from '../utils/permissions';

const Refugios = () => {
  const [searchValue, setSearchValue] = useState('');
  const { refugios, allRefugios, isLoading, totalPages, currentPage, handlePageChange } =
    useRefugios(searchValue);

  const { user } = useContext(AuthContext);

  const puedeCrear = can(user, 'refugios:create');

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8">
        {/* Cabecera + botón crear (condicional) */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center sm:text-left tracking-tight">
            Encuentra tu Próximo Compañero
          </h1>

          {puedeCrear ? (
            <Link
              to="/refugios/nuevo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                        transition-colors"
              aria-label="Crear nuevo refugio"
            >
              <i className="bi bi-plus-circle" />
              Crear refugio
            </Link>
          ) : (
            <div
              className="tooltip inline-flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
              data-tip="Necesitas ser un refugio para crear uno"
            >
              <i className="bi bi-plus-circle" />
              Crear refugio
            </div>
          )}
        </div>

        {/* Buscador centrado */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xl">
            <SearchInput onSearchChange={setSearchValue} />
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RefugioList refugios={refugios} allRefugios={allRefugios} />

            {/* Mensaje si no hay resultados */}
            {refugios.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No se encontraron refugios con ese nombre.
                </p>
              </div>
            )}

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Refugios;