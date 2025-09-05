// src/pages/MisSolicitudesDarEnAdopcion.jsx
import React, { useEffect, useState } from 'react';
import { getGiveAdoptionRequestsByUser } from '../services/apiService';
import Loader from '../components/Loader';

const MisSolicitudesDarEnAdopcion = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getGiveAdoptionRequestsByUser();
        const lista = Array.isArray(data) ? data : data?.data || data?.solicitudes || [];
        setSolicitudes(lista);
      } catch (err) {
        setError('Error al cargar tus solicitudes.');
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 mb-6">
          Mis solicitudes para dar en adopción
        </h2>

        {solicitudes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No has enviado ninguna solicitud para dar en adopción aún.
          </p>
        ) : (
          <ul className="space-y-4">
            {solicitudes.map((s) => (
              <li
                key={s._id}
                className="border rounded-lg p-4 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Mascota: {s.datosMascota?.nombre ?? 'Sin nombre'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Refugio: {s.refugio?.nombre ?? 'Sin refugio'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estado: <span className="capitalize font-medium">{s.estado}</span>
                    </p>
                    {s.mensajeDelUsuario && (
                      <p className="text-sm text-gray-400 mt-2">
                        <strong>Tu mensaje:</strong> {s.mensajeDelUsuario}
                      </p>
                    )}
                    {s.respuestaMensaje && (
                      <p className="text-sm text-gray-400 mt-2">
                        <strong>Respuesta del refugio:</strong> {s.respuestaMensaje}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MisSolicitudesDarEnAdopcion;