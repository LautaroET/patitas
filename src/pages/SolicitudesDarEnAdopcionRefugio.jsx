import React, { useEffect, useState } from 'react';
import {
  getGiveAdoptionRequestsByRefugio,
  updateGiveAdoptionRequest,
} from '../services/apiService';
import { toastError, toastSuccess } from '../utils/toastConfig';
import Swal from 'sweetalert2';

const SolicitudesDarEnAdopcionRefugio = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verHistorial, setVerHistorial] = useState(false);

  const fetchSolicitudes = async () => {
    try {
      const { data } = await getGiveAdoptionRequestsByRefugio();
      setSolicitudes(data);
    } catch (err) {
      toastError(err?.message || 'No se pudieron cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente');
  const historial = solicitudes.filter((s) => s.estado !== 'pendiente');

  const handleEstado = async (id, estado) => {
    console.log('📤 Enviando solicitud:', { id, estado });
  const result = await Swal.fire({
    title: `¿Marcar como ${estado}?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: estado === 'aceptada' ? '#22c55e' : '#ef4444',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  try {
    await updateGiveAdoptionRequest(id, estado);
    toastSuccess(`Solicitud ${estado}`);
    fetchSolicitudes(); // 👈 recargar lista
  } catch (err) {
    console.error("Error al actualizar solicitud:", err);
    console.error('❌ Error al actualizar:', err);  
    toastError(err?.message || 'No se pudo actualizar la solicitud');
  }
};

  const Tarjeta = ({ s }) => (
    <div className="border rounded-lg p-4 shadow dark:bg-gray-800 flex justify-between items-start">
      <div className="flex-1">
        <p className="font-semibold text-lg">{s.datosMascota.nombre}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {s.datosMascota.especie} · {s.datosMascota.edad} años · {s.datosMascota.genero}
        </p>
        <p className="text-sm mt-2">{s.mensajeDelUsuario}</p>
        {s.datosMascota.fotos?.[0] && (
          <img
            src={s.datosMascota.fotos[0].url}
            alt={s.datosMascota.nombre}
            className="w-32 h-32 object-cover rounded mt-2"
          />
        )}
      </div>

      <div className="ml-4 shrink-0">
        {s.estado === 'pendiente' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleEstado(s._id, 'aceptada')}
              className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleEstado(s._id, 'rechazada')}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Rechazar
            </button>
          </div>
        )}
        {s.estado !== 'pendiente' && (
          <span
            className={`px-3 py-1 rounded text-white text-sm ${
              s.estado === 'aceptada' ? 'bg-green-600' : 'bg-gray-500'
            }`}
          >
            {s.estado}
          </span>
        )}
      </div>
    </div>
  );

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Solicitudes para dar en adopción</h1>
        <button
          onClick={() => setVerHistorial((v) => !v)}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {verHistorial ? 'Ocultar historial' : 'Ver historial'}
        </button>
      </div>

      {/* Pendientes */}
      <div className="grid gap-4 mb-8">
        {pendientes.length ? (
          pendientes.map((s) => <Tarjeta key={s._id} s={s} />)
        ) : (
          <p>No tenés solicitudes pendientes.</p>
        )}
      </div>

      {/* Historial (opcional) */}
      {verHistorial && (
        <>
          <h2 className="text-xl font-semibold mb-3">Historial</h2>
          <div className="grid gap-4">
            {historial.length ? (
              historial.map((s) => <Tarjeta key={s._id} s={s} />)
            ) : (
              <p>No hay solicitudes resueltas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SolicitudesDarEnAdopcionRefugio;