import React from 'react';
import Swal from 'sweetalert2';
import { updateAdoptionRequest } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { toastSuccess,toastError } from '../utils/toastConfig';

const SolicitudDetalleModal = ({ solicitud, onClose, onStatusChange }) => {
  const { user } = useAuth();
  if (!solicitud) return null;

  const esRefugio = user?.role === 'refugio';
  const puedeGestionar = esRefugio && user?.permissions.includes('solicitudes:adopcion:patch');

  const handleCambioEstado = async (nuevoEstado) => {
    const result = await Swal.fire({
      title: `¿Marcar como ${nuevoEstado}?`,
      text: 'Esta acción notificará al usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
        console.log("📤 Enviando solicitud de adopción:", { id: solicitud._id, nuevoEstado });
        await updateAdoptionRequest(solicitud._id, nuevoEstado);
        toastSuccess("Solicitud actualizada");
        onStatusChange(solicitud._id, nuevoEstado);
        onClose();
      } catch (err) {
          console.error("❌ Error completo:", err);
          console.error("❌ Respuesta del backend:", err.response);
          console.error("❌ Mensaje del backend:", err.response?.data?.message);
          Swal.fire('Error', err.response?.data?.message || 'No se pudo actualizar la solicitud.', 'error');
        }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
        <h3 className="text-xl font-bold text-indigo-700 dark:text-blue-400 mb-4">Detalle de solicitud</h3>

        <div className="space-y-3 text-sm">
          <p><strong>Mascota:</strong> {solicitud.mascota?.nombre ?? 'Sin nombre'}</p>
          <p><strong>Solicitante:</strong> {solicitud.usuario?.username ?? 'Sin nombre'}</p>
          <p><strong>Estado:</strong> <span className="capitalize">{solicitud.estado}</span></p>
          <p><strong>Nombre:</strong> {solicitud.datosSolicitante?.nombreCompleto}</p>
          <p><strong>Teléfono:</strong> {solicitud.datosSolicitante?.telefono}</p>
          <p><strong>Email:</strong> {solicitud.datosSolicitante?.email}</p>
          {solicitud.datosSolicitante?.mensaje && (
            <p><strong>Mensaje:</strong> {solicitud.datosSolicitante.mensaje}</p>
          )}
          {solicitud.motivosAdopcion && (
            <p><strong>Motivos:</strong> {solicitud.motivosAdopcion}</p>
          )}
          {solicitud.respuestaMensaje && (
            <p><strong>Respuesta:</strong> {solicitud.respuestaMensaje}</p>
          )}
          <p><strong>Fecha:</strong> {new Date(solicitud.createdAt).toLocaleString()}</p>
        </div>

        {puedeGestionar && solicitud.estado === 'pendiente' && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => handleCambioEstado('aceptada')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleCambioEstado('rechazada')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Rechazar
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitudDetalleModal;