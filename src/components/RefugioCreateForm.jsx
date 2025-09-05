import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button'; 

const schema = yup.object().shape({
  nombre:        yup.string().required('El nombre es obligatorio'),
  direccion:     yup.string().required('La dirección es obligatoria'),
  telefono:      yup.string().matches(/^[0-9]+$/, 'Solo números').min(7).required(),
  email:         yup.string().email().required(),
  descripcion:   yup.string().max(1000, 'Máx 1000 caracteres'),
  imagen:        yup.array().of(yup.string().url()).min(1).required(),
  capacidad:     yup.number().positive().integer().required(),

  // OPCIONALES
  sitioWeb:      yup.string().url('URL inválida').nullable(true),
  horariosAtencion: yup.string().nullable(true),
  facebook:      yup.string().url('URL inválida').nullable(true),
  instagram:     yup.string().url('URL inválida').nullable(true),
  twitter:       yup.string().url('URL inválida').nullable(true),
});

const RefugioCreateForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Información del Refugio</h2>
      
      {/* Información de Contacto */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Información de Contacto</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              {...register('nombre')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Dirección */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
            <input
              type="text"
              id="direccion"
              {...register('direccion')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              {...register('telefono')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Capacidad */}
          <div className="flex flex-col">
            <label htmlFor="capacity" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacidad</label>
            <input
              type="number"
              id="capacidad"
              {...register('capacidad')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.capacidad && <p className="text-red-500 text-sm mt-1">{errors.capacidad.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Información Multimedia y Descriptiva */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Información Multimedia y Descriptiva</legend>
        
        <div className="grid grid-cols-1 gap-6">
          {/* URL de la imagen */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de la Imagen</label>
            <input
              type="url"
              id="imagen"
              {...register('imagen.0')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen.message}</p>}
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              id="descripcion"
              rows="4"
              {...register('descripcion')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* OPCIONALES - collapse simple */}
        <details className="mb-6 cursor-pointer">
          <summary className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Más información (opcional)
          </summary>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Sitio web */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Sitio web</label>
              <input
                type="url"
                {...register('sitioWeb')}
                className="p-3 border rounded-md dark:bg-gray-700"
              />
              {errors.sitioWeb && <p className="text-red-500 text-sm">{errors.sitioWeb.message}</p>}
            </div>

            {/* Horarios */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Horarios de atención</label>
              <input
                type="text"
                {...register('horariosAtencion')}
                className="p-3 border rounded-md dark:bg-gray-700"
              />
            </div>

            {/* Facebook */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Facebook (URL)</label>
              <input
                type="url"
                {...register('facebook')}
                className="p-3 border rounded-md dark:bg-gray-700"
              />
              {errors.facebook && <p className="text-red-500 text-sm">{errors.facebook.message}</p>}
            </div>

            {/* Instagram */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Instagram (URL)</label>
              <input
                type="url"
                {...register('instagram')}
                className="p-3 border rounded-md dark:bg-gray-700"
              />
              {errors.instagram && <p className="text-red-500 text-sm">{errors.instagram.message}</p>}
            </div>

            {/* Twitter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Twitter (URL)</label>
              <input
                type="url"
                {...register('twitter')}
                className="p-3 border rounded-md dark:bg-gray-700"
              />
              {errors.twitter && <p className="text-red-500 text-sm">{errors.twitter.message}</p>}
            </div>
          </div>
        </details>

      <div className="mt-8 flex justify-end">
        <Button type="submit">
          Crear Refugio
        </Button>
      </div>
    </form>
  );
};

export default RefugioCreateForm;