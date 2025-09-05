import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritosContext } from '../context/FavoritosContext';

const MascotaCard = ({ mascota }) => {
  const navigate = useNavigate();
  const { agregarAFavoritos, eliminarDeFavoritos, favoritos } = useContext(FavoritosContext);

  const isFavorite = favoritos.mascotas.some((fav) => fav.id === mascota._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite
      ? eliminarDeFavoritos(mascota._id, 'mascotas')
      : // ✅ CORRECCIÓN AQUÍ: Asegúrate de que el objeto tenga 'id' para la validación del contexto
      agregarAFavoritos({ ...mascota, id: mascota._id }, 'mascotas');
  };

  const handleCardClick = () => {
    navigate(`/mascotas/${mascota._id}`);
  };

  const ariaLabel = isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos';

  // ✅ Solución: Simplificar la función para que maneje un string
  const getImageUrl = (img) => {
    // Si la imagen es una URL válida, la devuelve. Si no, usa el placeholder.
    // Esto es útil si las fotos vienen como un array, pero el primer elemento es la foto principal
    if (Array.isArray(img) && img.length > 0) {
        return img[0];
    }
    return img && typeof img === 'string' ? img : '/placeholder.jpg';
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      {/* Botón de corazón */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 p-3 rounded-full z-10 transition-colors duration-300
          ${isFavorite
            ? 'text-red-500 bg-white/80 dark:bg-gray-700/80'
            : 'text-gray-400 bg-white/80 dark:bg-gray-700/80 hover:text-red-500'
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
        aria-label={ariaLabel}
      >
        <i className={`bi bi-heart${isFavorite ? '-fill' : ''} text-2xl`}></i>
      </button>

      {/* Imagen */}
      <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={getImageUrl(mascota.fotos)}
          alt={`Imagen de ${mascota.nombre ?? 'Mascota'}`}
          className="w-full h-full object-cover object-center"
        />
        {/* Estado */}
        <div
          className={`absolute bottom-0 left-0 px-4 py-2 rounded-tr-2xl text-sm font-bold text-white uppercase tracking-wider
            ${mascota.estado === 'disponible' ? 'bg-green-500' : 'bg-yellow-500'}`}
        >
          {mascota.estado ?? 'Disponible'}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-2xl font-extrabold text-indigo-700 dark:text-blue-400 mb-2">
          {mascota.nombre ?? 'Sin nombre'}
        </h4>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-700 dark:text-gray-300 mb-5">
          <p className="flex items-center">
            <i className="bi bi-clock-fill text-indigo-500 mr-2 text-lg"></i>
            <span>{mascota.edad ?? '?'} años</span>
          </p>
          <p className="flex items-center">
            <i
              className={`bi bi-gender-${mascota.genero?.toLowerCase() ?? 'unknown'} text-indigo-500 mr-2 text-lg`}
            ></i>
            <span className="capitalize">{mascota.genero ?? 'Desconocido'}</span>
          </p>
          <p className="flex items-center">
            <i className="bi bi-tag-fill text-indigo-500 mr-2 text-lg"></i>
            <span>{mascota.tamano ?? 'No especificado'}</span>
          </p>
          <p className="flex items-center col-span-2">
            <i className="bi bi-person-fill text-indigo-500 mr-2 text-lg"></i>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Personalidad:</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              {mascota.descripcion ?? 'Sin descripción'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MascotaCard;