import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-700 flex justify-center py-4 transition-colors duration-700
                      dark:bg-indigo-900">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white text-lg md:text-xl font-medium tracking-wide">
          &copy; <span className="text-amber-300">Personajes Rick And Morty</span> - Desarrollado por{" "}
          <span className="text-amber-300">Lautaro Tapia</span> - 2025
        </p>
        <p className="text-sm mt-1 text-blue-100 dark:text-gray-400">
          Módulo 4 - Sprint 4 Trabajo Práctico
        </p>
      </div>
    </footer>
  );
}

export default Footer;

