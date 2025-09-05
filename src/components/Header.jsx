import React, { useContext, useState } from "react";
import { TemaContext } from "../context/TemaContext";
import { navbarLink } from "../utils/link";
import { Link, useNavigate } from 'react-router-dom';
// 1. Importar useAuth
import { useAuth } from '../context/AuthContext';

function Header({ onToggleFavorites }) {
  const { temaOscuro, alternarTema } = useContext(TemaContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // 1. Inicializar useNavigate y useAuth aquí
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el estado del usuario

  // 2. Función para manejar la navegación del botón de usuario (escritorio y móvil)
  const handleAccountClick = () => {
    if (user) {
      navigate('/perfil');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="relative w-full min-h-[120px] bg-gradient-to-r from-blue-700 to-indigo-900 transition-colors duration-700 dark:from-indigo-900 dark:to-gray-900 rounded-b-lg shadow-md">
      {/* Contenedor principal para el contenido del header */}
      <div className="container mx-auto flex items-center justify-between p-4">
      <Link to="/">
        {/* Logo y título */}
        <div className="flex items-center gap-3">
          <img
            src={"/img/patitas.png"}
            alt="Logo de patitas"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-white text-2xl font-extrabold tracking-wide">
            <span className="text-amber-300">Patitas</span> <em>al</em>{" "}
            <span className="text-amber-300">Rescate</span>
          </h1>
        </div>
      </Link>

        {/* Botones de utilidades y menú de hamburguesa */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Botón para alternar tema */}
          <button
            onClick={alternarTema}
            className="text-white p-2 rounded-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300 hover:scale-110 transition-transform duration-300"
            aria-label="Alternar tema"
          >
            {temaOscuro ? (
              <i className="bi bi-sun-fill text-xl"></i>
            ) : (
              <i className="bi bi-moon-fill text-xl"></i>
            )}
          </button>
          
          {/* Botón para favoritos (solo visible en escritorio) */}
          <button
            onClick={onToggleFavorites}
            className="hidden md:block text-white p-2 rounded-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300 hover:scale-110 transition-transform duration-300"
            aria-label="Abrir favoritos"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Botón para Mi Cuenta (solo visible en escritorio) */}
          <button
            // 3. Usar la función handleAccountClick
            onClick={handleAccountClick}
            className="hidden md:block text-white p-2 rounded-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300 hover:scale-110 transition-transform duration-300"
            aria-label="Mi Cuenta"
          >
            <i className="bi bi-person-fill text-2xl"></i>
          </button>

          {/* Botón de hamburguesa (visible solo en móviles) */}
          <button
            className="md:hidden text-white p-2 rounded-md bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Barra de navegación de escritorio - Posicionada abajo del header */}
      <nav className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden md:block">
        <ul className="flex space-x-1 bg-white/20 backdrop-blur-sm rounded-full shadow-lg border border-white/10 p-1">
          {navbarLink.map((link) => {
            const isHowToAdopt = link.title === "Cómo Adoptar ";
            
            const linkClasses = `text-white text-base px-4 py-2 rounded-full inline-block hover:text-amber-300 transition-all duration-300 transform hover:scale-105 ${isHowToAdopt ? "font-bold" : "font-medium"}`;
            
            return (
              <li key={link.id}>
                <Link to={link.link} className={linkClasses}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Menú desplegable para móviles */}
      <nav className={`md:hidden absolute top-[7rem] left-0 w-full bg-blue-900 z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
        <ul className="flex flex-col py-4 px-4">
          {navbarLink.map((link) => (
            <li key={link.id} className="py-3 text-center border-b border-blue-800 last:border-b-0">
              <Link
                to={link.link}
                className="text-white text-lg font-semibold hover:text-sky-300 transition-colors duration-200 block w-full"
                onClick={toggleMenu}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {/* Botón de favoritos para móviles */}
          <li className="py-3 text-center border-b border-blue-800 last:border-b-0">
            <button
              onClick={() => { onToggleFavorites(); toggleMenu(); }}
              className="text-white text-lg font-semibold hover:text-sky-300 transition-colors duration-200 block w-full"
            >
              <i className="bi bi-heart-fill mr-2"></i>
              Favoritos
            </button>
          </li>
          {/* Botón de Mi Cuenta para móviles */}
          <li className="py-3 text-center border-b border-blue-800 last:border-b-0">
            <button // Cambiado de Link a button para usar onClick
              // 4. Usar la función handleAccountClick y toggleMenu
              onClick={() => { handleAccountClick(); toggleMenu(); }}
              className="text-white text-lg font-semibold hover:text-sky-300 transition-colors duration-200 block w-full"
            >
              <i className="bi bi-person-fill mr-2"></i>
              Mi Cuenta
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;