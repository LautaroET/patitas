// src/components/AdoptarForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { toastSuccess, toastError } from '../utils/toastConfig';
import { createAdoptionRequest } from '../services/apiService';

const schema = yup.object().shape({
  nombreCompleto: yup.string().required('El nombre completo es obligatorio'),
  telefono: yup.string().required('El teléfono es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  mensaje: yup.string().max(1000, 'Máximo 1000 caracteres'),
  motivosAdopcion: yup.string().max(1000, 'Máximo 1000 caracteres'),
});

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const AdoptarForm = ({ mascotaId, refugioId, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!isValidObjectId(mascotaId) || !isValidObjectId(refugioId)) {
      toastError('ID de mascota o refugio inválido');
      return;
    }

    const result = await Swal.fire({
      title: '¿Confirmar solicitud?',
      text: 'Estás a punto de enviar una solicitud de adopción.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      await createAdoptionRequest({
        mascota: mascotaId,
        refugio: refugioId,
        datosSolicitante: {
          nombreCompleto: data.nombreCompleto,
          telefono: data.telefono,
          email: data.email,
          mensaje: data.mensaje,
        },
        motivosAdopcion: data.motivosAdopcion,
      });

      toastSuccess('Solicitud enviada con éxito');
      onSuccess();
    } catch (err) {
      toastError(err?.message || 'Error al enviar la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre completo</label>
        <input
          type="text"
          {...register('nombreCompleto')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.nombreCompleto && <p className="text-red-500 text-sm">{errors.nombreCompleto.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
        <input
          type="text"
          {...register('telefono')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje (opcional)</label>
        <textarea
          {...register('mensaje')}
          rows={3}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">¿Por qué quieres adoptar?</label>
        <textarea
          {...register('motivosAdopcion')}
          rows={3}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.motivosAdopcion && <p className="text-red-500 text-sm">{errors.motivosAdopcion.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-lg text-white font-semibold ${
          isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  );
};

export default AdoptarForm;