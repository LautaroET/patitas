import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleDashboard = ({ user }) => {
  const navigate = useNavigate();
  const rol = user?.role;

  if (!rol) return <p className="text-gray-600 dark:text-gray-300">Rol no definido.</p>;

  switch (rol) {
      case 'comun':
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Acciones de Usuario</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Aquí podrás ver tus solicitudes enviadas.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/mis-solicitudes-adopcion')}
              className="w-full sm:w-auto px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Ver mis solicitudes para dar en adopción
          </button>
            <button
              onClick={() => navigate('/mis-solicitudes-dar-en-adopcion')}
              className="w-full sm:w-auto px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Ver mis solicitudes para dar en adopción
            </button>
          </div>
        </div>
      );

    case 'refugio':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Gestión de tu Refugio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Administra las mascotas de tu refugio.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/mis-mascotas')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ver mis mascotas
              </button>
              <button
                onClick={() => navigate('/solicitudes-adopcion-refugio')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Ver solicitudes de adopción
              </button>
              <button
                onClick={() => navigate('/solicitudes-dar-en-adopcion-refugio')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Ver solicitudes para recibir mascotas
              </button>
            </div>
          </div>
        );

    case 'admin':
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Panel de Administrador</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Acceso total a usuarios, mascotas y refugios.</p>
          <button
            onClick={() => navigate('/admin')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Ver estadísticas
          </button>
        </div>
      );

    default:
      return <p className="text-gray-600 dark:text-gray-300">Rol no reconocido.</p>;
  }
};

export default RoleDashboard;