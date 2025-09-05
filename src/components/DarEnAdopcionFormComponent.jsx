import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { toastSuccess, toastError } from '../utils/toastConfig';
import { createGiveAdoptionRequest } from '../services/apiService';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(2).max(50),
  especie: yup.string().oneOf(['perro', 'gato', 'conejo', 'ave', 'otro']).required('Selecciona una especie'),
  genero: yup.string().oneOf(['macho', 'hembra']).required('Selecciona el sexo'),
  edad: yup.number().typeError('Debe ser un número').min(0).max(30).optional(),
  descripcion: yup.string().max(500).optional(),
  imagen: yup.string().url('Debe ser una URL válida').optional(),
  mensaje: yup.string().max(500).optional(),
});

const DarEnAdopcionFormComponent = ({ refugioId, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: '¿Enviar solicitud?',
      text: 'Se notificará al refugio.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      await createGiveAdoptionRequest({
        refugioId,
        datosMascota: {
          nombre: data.nombre,
          especie: data.especie,
          genero: data.genero,
          edad: data.edad || null,
          descripcion: data.descripcion,
          fotos: data.imagen, // Ahora envía la URL directamente
        },
        mensajeDelUsuario: data.mensaje,
      });

      toastSuccess('Solicitud enviada con éxito');
      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      toastError(err?.message || 'Error al enviar la solicitud. Por favor, revisa los datos.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la mascota</label>
        <input
          id="nombre"
          type="text"
          {...register('nombre')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
      </div>

      <div>
        <label htmlFor="especie" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Especie</label>
        <select
          id="especie"
          {...register('especie')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white">
          <option value="">Selecciona...</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="conejo">Conejo</option>
          <option value="ave">Ave</option>
          <option value="otro">Otro</option>
        </select>
        {errors.especie && <p className="text-red-500 text-sm">{errors.especie.message}</p>}
      </div>

      <div>
        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sexo</label>
        <select
          id="genero"
          {...register('genero')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white">
          <option value="">Selecciona...</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
        {errors.genero && <p className="text-red-500 text-sm">{errors.genero.message}</p>}
      </div>

      <div>
        <label htmlFor="edad" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Edad (años)</label>
        <input
          id="edad"
          type="number"
          {...register('edad')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
        <textarea
          id="descripcion"
          {...register('descripcion')}
          rows={3}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      <div>
        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de la imagen</label>
        <input
          id="imagen"
          type="url"
          {...register('imagen')}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje al refugio (opcional)</label>
        <textarea
          id="mensaje"
          {...register('mensaje')}
          rows={3}
          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-lg text-white font-semibold ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  );
};

export default DarEnAdopcionFormComponent;