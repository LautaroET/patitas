// src/pages/SolicitudesParaMiRefugio.jsx
import React, { useEffect, useState } from 'react';
import { getAdoptionRequestsByRefugio } from '../services/apiService';
import Loader from '../components/Loader';
import SolicitudDetalleModal from '../components/SolicitudDetalleModal';

const SolicitudesParaMiRefugio = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getAdoptionRequestsByRefugio();
        const lista = Array.isArray(data) ? data : data?.data || data?.solicitudes || [];
        setSolicitudes(lista);
      } catch (err) {
        setError('Error al cargar las solicitudes.');
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleStatusChange = (id, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s._id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 mb-6">
          Solicitudes de adopción recibidas
        </h2>

        {solicitudes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No has recibido ninguna solicitud aún.</p>
        ) : (
          <ul className="space-y-4">
            {solicitudes.map((s) => (
              <li
                key={s._id}
                onClick={() => setSeleccionada(s)}
                className="border rounded-lg p-4 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Mascota: {s.mascota?.nombre ?? 'Sin nombre'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Solicitante: {s.usuario?.username ?? 'Sin nombre'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estado: <span className="capitalize font-medium">{s.estado}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <SolicitudDetalleModal
          solicitud={seleccionada}
          onClose={() => setSeleccionada(null)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default SolicitudesParaMiRefugio;