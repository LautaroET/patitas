import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { useMascotaDetail } from '../hook/useMascotaDetail';
import { useAuth } from '../context/AuthContext';
import { can } from '../utils/permissions';
import { deleteMascota } from '../services/apiService';

const MascotaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mascota, isLoading, error } = useMascotaDetail(id);
  const { user } = useAuth();

  const puedeEditar = can(user, 'mascotas:update');
  const puedeEliminar = can(user, 'mascotas:delete');

  const handleEditar = () => navigate(`/mascotas/${id}/editar`);

  const handleEliminar = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar esta mascota?')) return;
    try {
      await deleteMascota(id);
      toast.success('Mascota eliminada correctamente');
      navigate(-1); // vuelve atrás
    } catch (err) {
      toast.error('Error al eliminar mascota');
      console.error(err);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-gray-100 dark:bg-gray-900">
        <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </div>
      </div>
    );
  if (!mascota) return <p className="text-center text-gray-600 dark:text-gray-400">Mascota no encontrada.</p>;

  const getImageUrl = () => {
    if (!mascota.imagen) return '/placeholder.jpg';
    if (typeof mascota.imagen === 'string') return mascota.imagen;
    if (Array.isArray(mascota.imagen) && mascota.imagen[0]) {
      const item = mascota.imagen[0];
      if (typeof item === 'string') return item;
      if (item?.url) return item.url;
    }
    return '/placeholder.jpg';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => navigate(-1)} className="mb-4 md:mb-0">
            <i className="bi bi-arrow-left-circle-fill mr-2"></i>Volver
          </Button>

          {/* Botones solo si tiene permisos */}
          {(puedeEditar || puedeEliminar) && (
            <div className="flex gap-3">
              {puedeEditar && (
                <Button onClick={handleEditar} className="bg-yellow-500 hover:bg-yellow-600">
                  <i className="bi bi-pencil-square mr-2"></i>Editar
                </Button>
              )}
              {puedeEliminar && (
                <Button onClick={handleEliminar} className="bg-red-500 hover:bg-red-600">
                  <i className="bi bi-trash-fill mr-2"></i>Eliminar
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800 mb-8">
          <img
            src={getImageUrl()}
            alt={`Imagen de ${mascota.nombre ?? 'Mascota'}`}
            className="w-full h-80 md:h-96 object-cover object-center"
          />

          <div className="p-6 md:p-8 text-gray-800 dark:text-gray-200">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-blue-400 mb-2">
                  {mascota.nombre ?? 'Sin nombre'}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{mascota.raza}</p>
              </div>

              <div
                className={`px-4 py-2 rounded-full text-sm font-bold text-white uppercase tracking-wider mt-4 md:mt-0
                  ${mascota.estado === 'disponible'
                    ? 'bg-green-500'
                    : mascota.estado === 'en proceso de adopción'
                    ? 'bg-yellow-500'
                    : mascota.estado === 'adoptado'
                    ? 'bg-blue-500'
                    : 'bg-gray-500'}`}
              >
                {mascota.estado}
              </div>
            </div>

            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-blue-300 mb-4">Información básica</h2>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <i className="bi bi-clock-fill text-indigo-500 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Edad</p>
                    <p className="font-semibold">{mascota.edad ?? '?'} años</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <i
                      className={`bi bi-gender-${mascota.genero?.toLowerCase() ?? 'unknown'} text-indigo-500 text-lg`}
                    ></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Género</p>
                    <p className="font-semibold capitalize">{mascota.genero ?? 'Desconocido'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <i className="bi bi-rulers text-indigo-500 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tamaño</p>
                    <p className="font-semibold">{mascota.tamano ?? 'No especificado'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <i className="bi bi-heart-fill text-indigo-500 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Características</p>
                    <p className="font-semibold">{mascota.caracteristicas?.join(', ') ?? 'Sin información'}</p>
                  </div>
                </div>
              </div>

              {/* Información del refugio */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-blue-300 mb-4">Información del refugio</h2>

                {mascota.refugio ? (
                  <>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                        <i className="bi bi-house-heart text-indigo-500 text-lg"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Refugio</p>
                        <p className="font-semibold">{mascota.refugio.nombre ?? 'Sin nombre'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                        <i className="bi bi-geo-alt-fill text-indigo-500 text-lg"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dirección</p>
                        <p className="font-semibold">{mascota.refugio.direccion ?? 'No especificada'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                        <i className="bi bi-telephone-fill text-indigo-500 text-lg"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                        <p className="font-semibold">{mascota.refugio.telefono ?? 'No disponible'}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Información del refugio no disponible.</p>
                )}
              </div>
            </div>

            {/* Descripción */}
            {mascota.descripcion && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-blue-300 mb-3">Descripción</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{mascota.descripcion}</p>
              </div>
            )}

            {/* CTA adopción */}
            {mascota.refugio && (
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-blue-400 mb-4">
                  ¿Interesado en adoptar?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Contacta al refugio o envía una solicitud formal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <i className="bi bi-telephone-outbound-fill mr-2"></i>
                    Llamar: {mascota.refugio.telefono ?? 'No disponible'}
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <i className="bi bi-whatsapp mr-2"></i>Contactar por WhatsApp
                  </Button>

                  {can(user, 'solicitudes:adopcion:create') && (
                    <Button
                      onClick={() => navigate(`/mascotas/${id}/adoptar`)}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      <i className="bi bi-heart-fill mr-2"></i>Adoptar
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascotaDetail;