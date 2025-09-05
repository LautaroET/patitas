import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TemaContext } from '../context/TemaContext'; // tu contexto
import Button from '../components/Button';

const AccessDenied = () => {
  const { temaOscuro } = useContext(TemaContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${
        temaOscuro
          ? 'bg-gradient-to-br from-gray-900 to-indigo-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      <div
        className={`rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border backdrop-blur-sm transition-all ${
          temaOscuro
            ? 'bg-gray-800/90 border-gray-700'
            : 'bg-white/80 border-white/20'
        }`}
      >
        {/* Ícono */}
        <div className="text-6xl mb-4">🚫</div>

        <h1
          className={`text-3xl font-extrabold mb-2 ${
            temaOscuro ? 'text-red-400' : 'text-red-500'
          }`}
        >
          Acceso denegado
        </h1>

        <p className={`mb-6 ${temaOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
          Parece que esta zona está reservada para humanos con más poderes.
          <br />
          <span className={`text-sm ${temaOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            (O quizá solo haya que iniciar sesión)
          </span>
        </p>

        <Link to="/">
          <Button>← Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;