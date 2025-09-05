import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Authentication = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center p-8 max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          ¡Bienvenido a <span className="text-blue-600 dark:text-indigo-500">Patitas al Rescate</span>!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Encuentra tu compañero ideal o ayuda a una mascota a encontrar un hogar.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Iniciar Sesión
          </Button>
          <Button 
            onClick={() => navigate('/registro')} 
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;