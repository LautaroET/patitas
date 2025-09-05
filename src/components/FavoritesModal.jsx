// src/components/FavoritesModal.jsx

import React, { useContext, useState, useEffect } from "react";
import { FavoritosContext } from "../context/FavoritosContext";
import { Link } from "react-router-dom"; // Importar Link para que los elementos sean clicables

function FavoritesModal({ onClose }) {
  const {
    favoritos = { refugios: [], mascotas: [] },
    eliminarDeFavoritos,
    vaciarFavoritos
  } = useContext(FavoritosContext);

  const [activeTab, setActiveTab] = useState('refugios');
  const [displayedCounts, setDisplayedCounts] = useState({
    refugios: 0,
    mascotas: 0
  });

  // Actualizar los contadores cuando cambian los favoritos
  useEffect(() => {
    setDisplayedCounts({
      refugios: favoritos.refugios?.length || 0,
      mascotas: favoritos.mascotas?.length || 0
    });
  }, [favoritos]);

  // Obtener los favoritos actuales de manera segura
  const currentFavorites = favoritos[activeTab] || [];

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto transition-colors duration-700 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-blue-400">
            Mis Favoritos 🐾
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold dark:text-gray-400 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Pestañas con contadores independientes */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'refugios' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('refugios')}
          >
            Refugios ({displayedCounts.refugios})
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'mascotas' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('mascotas')}
          >
            Mascotas ({displayedCounts.mascotas})
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        {currentFavorites.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center py-8">
            {`No tienes ${activeTab === 'refugios' ? 'refugios' : 'mascotas'} favoritos aún.`}
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {currentFavorites.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm transition-colors duration-500 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <img
                      // ✅ CORRECCIÓN AQUÍ: Usar 'imagen' para refugios y 'fotos' para mascotas
                      src={activeTab === 'refugios' ? item.imagen : item.fotos}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <span className="text-gray-800 font-medium dark:text-gray-100 block">
                        {item.nombre || item.name}
                      </span>
                      {activeTab === 'mascotas' && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.breed || 'Sin raza especificada'}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarDeFavoritos(item.id, activeTab)}
                    className="text-red-500 hover:text-red-700 ml-4 transition-colors dark:text-red-400 dark:hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-right">
              <button
                onClick={() => vaciarFavoritos(activeTab)}
                className="mt-4 bg-red-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition-colors duration-300 dark:bg-red-700 dark:hover:bg-red-600"
              >
                Vaciar {activeTab === 'refugios' ? 'refugios' : 'mascotas'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FavoritesModal;