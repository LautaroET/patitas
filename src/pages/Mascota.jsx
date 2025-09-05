import React, { useState } from 'react';
import MascotaList from "../components/MascotaList";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import { useMascotas } from "../hook/useMascotas";
import Pagination from "../components/Pagination";

const Mascotas = () => {
  const [searchValue, setSearchValue] = useState("");
  const { mascotas, isLoading, totalPages, currentPage, handlePageChange } = useMascotas(searchValue);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700 rounded-lg shadow-md">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Título centrado */}
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center tracking-tight">
            Mascotas en Adopción
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Encuentra a tu compañero perfecto entre nuestras mascotas disponibles
          </p>
        </div>

        {/* Sección del buscador, centrada y con un ancho máximo */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xl">
            <SearchInput onSearchChange={setSearchValue} />
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <MascotaList 
              mascotas={mascotas}
            />
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

export default Mascotas;