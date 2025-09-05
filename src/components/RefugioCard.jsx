// src/components/RefugioCard.jsx

import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { FavoritosContext } from "../context/FavoritosContext";

function RefugioCard({ refugio }) {
  const { favoritos = { refugios: [], mascotas: [] }, agregarAFavoritos, eliminarDeFavoritos } = useContext(FavoritosContext);

  // Asegurarse de que favoritos.refugios sea un array
  const favoritosRefugios = Array.isArray(favoritos.refugios) ? favoritos.refugios : [];

  // Comprobar si el refugio es favorito usando su _id
  const isFavorite = favoritosRefugios.some((fav) => fav.id === refugio._id);

  const handleClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      eliminarDeFavoritos(refugio._id, 'refugios');
    } else {
      // ✅ CORRECCIÓN AQUÍ: Crea un nuevo objeto para consistencia con FavoritosContext
      // Se crea un objeto con una propiedad 'id' que usa el '_id' del refugio
      const refugioParaFavoritos = {
        id: refugio._id, // Usar _id de la API como id en el estado
        nombre: refugio.nombre,
        imagen: refugio.imagen,
        direccion: refugio.direccion,
        telefono: refugio.telefono,
      };
      agregarAFavoritos(refugioParaFavoritos, 'refugios');
    }
  };

  const ariaLabel = isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos";

  return (
    <Link to={`/refugios/${refugio._id}`}>
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:shadow-2xl dark:hover:shadow-lg flex flex-col">
        {/* Botón de corazón */}
        <button
          onClick={handleClick}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors duration-300
                    ${isFavorite
            ? "text-red-500 bg-white/70 dark:bg-gray-700/70"
            : "text-gray-400 bg-white/70 dark:bg-gray-700/70 hover:text-red-500"
            }`}
          aria-label={ariaLabel}
        >
          <i className={`bi bi-heart${isFavorite ? "-fill" : ""} text-2xl`}></i>
        </button>

        {/* Contenido de la tarjeta */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={refugio.imagen}
            alt={`Imagen de ${refugio.nombre}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="p-6 flex flex-col flex-grow text-left">
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 mb-4 text-center">
            {refugio.nombre}
          </h3>

          <div className="flex-grow space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <i className="bi bi-geo-alt-fill text-indigo-500 mr-2"></i>
              {refugio.direccion}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <i className="bi bi-telephone-fill text-indigo-500 mr-2"></i>
              {refugio.telefono}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RefugioCard;