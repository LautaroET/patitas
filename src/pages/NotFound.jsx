import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-gradient-to-b from-blue-700 to-indigo-900 text-white transition-colors duration-700 dark:from-indigo-900 dark:to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-extrabold text-amber-300 drop-shadow-lg">404</h1>
        <p className="text-3xl font-semibold mt-4 mb-2 dark:text-gray-100">Página no encontrada</p>
        <p className="text-lg text-blue-100 dark:text-gray-400 mb-8">
          ¡Ups! Parece que te has perdido. La página que buscas no existe.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-amber-300 hover:bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105 dark:text-gray-900 dark:bg-yellow-400 dark:hover:bg-yellow-500"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;