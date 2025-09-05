// src/pages/SolicitudesRefugioAdopcion.jsx
import React, { useEffect, useState } from 'react';
import { getAdoptionRequestsByRefugio, updateAdoptionRequest } from '../services/apiService';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const SolicitudesRefugioAdopcion = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleCambioEstado = async (id, nuevoEstado, mensaje = '') => {
    const result = await Swal.fire({
      title: `¿Marcar como ${nuevoEstado}?`,
      text: 'El usuario recibirá esta respuesta.',
      input: 'textarea',
      inputLabel: 'Mensaje al solicitante (opcional)',
      inputPlaceholder: 'Escribe tu respuesta aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      await updateAdoptionRequest(id, nuevoEstado, result.value);
      Swal.fire('Actualizado', `Solicitud ${nuevoEstado}.`, 'success');
      setSolicitudes((prev) =>
        prev.map((s) => (s._id === id ? { ...s, estado: nuevoEstado, respuestaMensaje: result.value } : s))
      );
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar la solicitud.', 'error');
    }
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
                className="border rounded-lg p-4 dark:border-gray-700"
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
                    {s.respuestaMensaje && (
                      <p className="text-sm text-gray-400 mt-2">
                        <strong>Tu respuesta:</strong> {s.respuestaMensaje}
                      </p>
                    )}
                  </div>

                  {s.estado === 'pendiente' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCambioEstado(s._id, 'aceptada')}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => handleCambioEstado(s._id, 'rechazada')}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SolicitudesRefugioAdopcion;