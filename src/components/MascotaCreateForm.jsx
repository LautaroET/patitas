// src/components/MascotaCreateForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  especie: yup.string().oneOf(['perro', 'gato', 'conejo', 'ave', 'otro']).required('La especie es obligatoria'),
  raza: yup.string().required('La raza es obligatoria'),
  edad: yup.number().positive().integer().required('La edad es obligatoria'),
  genero: yup.string().oneOf(['Macho', 'Hembra']).required('El género es obligatorio'),
  tamano: yup.string().oneOf(['Pequeño', 'Mediano', 'Grande']).required('El tamaño es obligatorio'),
  estado: yup.string().oneOf(['En adopción', 'Adoptado', 'Reservado']).required('El estado es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  imagen: yup.string().url('URL inválida').required('La imagen es obligatoria'),
});

export default function MascotaCreateForm({ onFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    const mapped = {
      ...data,
      genero: data.genero.toLowerCase(),
      tamano: data.tamano.toLowerCase(),
      estado:
        data.estado === 'En adopción'
          ? 'disponible'
          : data.estado === 'Adoptado'
          ? 'adoptado'
          : 'en proceso de adopción',
      imagen: data.imagen.trim(), // ✅ ahora es string directo
    };
    onFormSubmit(mapped);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Información de la Mascota</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Nombre</label>
          <input {...register('nombre')} className="p-3 border rounded-md dark:bg-gray-700" />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
        </div>

        {/* Especie */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Especie</label>
          <select {...register('especie')} className="p-3 border rounded-md dark:bg-gray-700">
            <option value="">Seleccionar</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="conejo">Conejo</option>
            <option value="ave">Ave</option>
            <option value="otro">Otro</option>
          </select>
          {errors.especie && <p className="text-red-500 text-sm">{errors.especie.message}</p>}
        </div>

        {/* Raza */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Raza</label>
          <input {...register('raza')} className="p-3 border rounded-md dark:bg-gray-700" />
          {errors.raza && <p className="text-red-500 text-sm">{errors.raza.message}</p>}
        </div>

        {/* Edad */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Edad (años)</label>
          <input type="number" {...register('edad')} className="p-3 border rounded-md dark:bg-gray-700" />
          {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}
        </div>

        {/* Género */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Género</label>
          <select {...register('genero')} className="p-3 border rounded-md dark:bg-gray-700">
            <option value="">Seleccionar</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
          {errors.genero && <p className="text-red-500 text-sm">{errors.genero.message}</p>}
        </div>

        {/* Tamaño */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Tamaño</label>
          <select {...register('tamano')} className="p-3 border rounded-md dark:bg-gray-700">
            <option value="">Seleccionar</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
          {errors.tamano && <p className="text-red-500 text-sm">{errors.tamano.message}</p>}
        </div>

        {/* Estado */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Estado</label>
          <select {...register('estado')} className="p-3 border rounded-md dark:bg-gray-700">
            <option value="">Seleccionar</option>
            <option value="En adopción">En adopción</option>
            <option value="Adoptado">Adoptado</option>
            <option value="Reservado">Reservado</option>
          </select>
          {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}
        </div>

        {/* Imagen */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">URL imagen</label>
          <input {...register('imagen')} className="p-3 border rounded-md dark:bg-gray-700" />
          {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1">Descripción</label>
        <textarea {...register('descripcion')} rows={4} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Crear Mascota
        </button>
      </div>
    </form>
  );
}