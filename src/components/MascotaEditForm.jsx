import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';
import { getMascotaById, fetchRefugioById } from '../services/apiService';
import { useParams } from 'react-router-dom';
import Loader from './Loader';


const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  raza: yup.string().required('La raza es obligatoria'),
  edad: yup
    .number()
    .positive('La edad debe ser un número positivo')
    .integer('La edad debe ser un número entero')
    .required('La edad es obligatoria')
    .typeError('La edad debe ser un número'),
  genero: yup.string().oneOf(['macho', 'hembra']).required('El género es obligatorio'),
  tamano: yup.string().oneOf(['pequeño', 'mediano', 'grande']).required('El tamaño es obligatorio'),
  estado: yup
    .string()
    .oneOf(['disponible', 'en proceso de adopción', 'adoptado'])
    .required('El estado es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  imagen: yup.string().url('Debe ser una URL válida').required('La imagen es obligatoria'),
  refugio: yup.string().required('El refugio es obligatorio'),
});

const MascotaEditForm = ({ onSubmit }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [refugioName, setRefugioName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMascotaById(id);
        const data = res.data;

        // Obtener nombre del refugio
        if (data.refugio) {
          const refRes = await fetchRefugioById(data.refugio);
          setRefugioName(refRes.data?.nombre || 'Desconocido');
        }

        // Mapear datos al formulario
        reset({
          nombre: data.nombre || '',
          raza: data.raza || '',
          edad: data.edad || '',
          genero: data.genero || '',
          tamano: data.tamano || '',
          estado: data.estado || 'disponible',
          descripcion: data.descripcion || '',
          imagen: data.imagen || '',
          refugio: data.refugio || '',
        });
      } catch (err) {
        console.error('Error al cargar mascota:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  if (isLoading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Editar Mascota</h2>

      {/* Información Básica */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Información Básica</legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input
              {...register('nombre')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Raza */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raza</label>
            <input
              {...register('raza')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.raza && <p className="text-red-500 text-sm mt-1">{errors.raza.message}</p>}
          </div>

          {/* Edad */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Edad (años)</label>
            <input
              type="number"
              {...register('edad')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.edad && <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>}
          </div>

          {/* Género */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Género</label>
            <select
              {...register('genero')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar género</option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
            {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>}
          </div>

          {/* Tamaño */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamaño</label>
            <select
              {...register('tamano')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar tamaño</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
            {errors.tamano && <p className="text-red-500 text-sm mt-1">{errors.tamano.message}</p>}
          </div>

          {/* Estado */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
            <select
              {...register('estado')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="disponible">Disponible</option>
              <option value="en proceso de adopción">En proceso de adopción</option>
              <option value="adoptado">Adoptado</option>
            </select>
            {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Imagen y Descripción */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Imagen y Descripción</legend>

        <div className="grid grid-cols-1 gap-6">
          {/* Imagen */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de la Imagen</label>
            <input
              {...register('imagen')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen.message}</p>}
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              rows={4}
              {...register('descripcion')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Refugio (solo lectura) */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Refugio</legend>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Refugio actual</label>
          <input
            type="text"
            value={refugioName}
            readOnly
            className="p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white cursor-not-allowed"
          />
          <input type="hidden" {...register('refugio')} />
        </div>
      </fieldset>

      {/* Botón Guardar */}
      <div className="mt-8 flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};

export default MascotaEditForm;