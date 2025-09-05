// src/components/RefugioEditForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMiRefugio, updateMiRefugio } from '../services/apiService';
import Loader from './Loader';

const schema = yup.object({
  nombre: yup.string().required('Nombre obligatorio'),
  direccion: yup.string().required('Dirección obligatoria'),
  telefono: yup.string().min(7, 'Mín 7 números').required('Teléfono obligatorio'),
  email: yup.string().email('Email inválido').required('Email obligatorio'),
  imagen: yup.string().url('URL inválida').required('Imagen obligatoria'),
  capacidad: yup.number().positive().integer().required('Capacidad obligatoria'),
  descripcion: yup.string().default(''),
  sitioWeb: yup.string().url('URL inválida').nullable(true),
  horariosAtencion: yup.string().nullable(true),
  facebook: yup.string().url('URL inválida').nullable(true),
  instagram: yup.string().url('URL inválida').nullable(true),
  twitter: yup.string().url('URL inválida').nullable(true),
});

export default function RefugioEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    (async () => {
      try {
        // usamos el NUEVO endpoint que SÍ existe
        const { data } = await fetchMiRefugio();
        console.log('📥 Mi refugio:', data);

        const mapped = {
          nombre: data.nombre || '',
          direccion: data.direccion || '',
          telefono: data.telefono || '',
          email: data.email || '',
          descripcion: data.descripcion || '',
          imagen: data.imagen || '',
          capacidad: data.capacidad || 0,
          sitioWeb: data.sitioWeb || '',
          horariosAtencion: data.horariosAtencion || '',
          facebook: data.redesSociales?.facebook || '',
          instagram: data.redesSociales?.instagram || '',
          twitter: data.redesSociales?.twitter || '',
        };
        reset(mapped);
      } catch (e) {
        toast.error('No se pudo cargar tu refugio');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [reset]);

  const onSubmit = async (values) => {
    console.log('🔥 onSubmit disparado', values);
    const payload = {
      ...values,
      redesSociales: {
        facebook: values.facebook || undefined,
        instagram: values.instagram || undefined,
        twitter: values.twitter || undefined,
      },
    };
    console.log('📦 Payload a enviar', payload);

    try {
      await updateMiRefugio(payload); // ← endpoint que SÍ existe
      toast.success('Refugio actualizado');
      navigate(`/refugios/${id}`);
    } catch (err) {
      console.error('❌ Error actualizando', err);
      toast.error('Error al actualizar');
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Editar Refugio</h2>

      {/* Errores visibles */}
      {/* Errores visibles (sin circular) */}
      {Object.keys(errors).length > 0 && (
        <ul className="text-xs text-red-500 mb-4">
          {Object.entries(errors).map(([field, { message }]) => (
            <li key={field}>{field}: {message}</li>
          ))}
        </ul>
      )}

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input {...register('nombre')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
      </div>

      {/* Dirección */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input {...register('direccion')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Teléfono</label>
        <input {...register('telefono')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" {...register('email')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Imagen */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">URL imagen</label>
        <input {...register('imagen')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
      </div>

      {/* Capacidad */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Capacidad</label>
        <input type="number" {...register('capacidad')} className="w-full p-3 border rounded-md dark:bg-gray-700" />
        {errors.capacidad && <p className="text-red-500 text-sm">{errors.capacidad.message}</p>}
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea {...register('descripcion')} rows={4} className="w-full p-3 border rounded-md dark:bg-gray-700" />
      </div>

      {/* Opcionales collapse */}
      <details className="mb-6 cursor-pointer">
        <summary className="text-lg font-medium text-gray-800 dark:text-gray-200">Más información (opcional)</summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col"><label className="text-sm font-medium mb-1">Sitio web</label><input {...register('sitioWeb')} className="p-3 border rounded-md dark:bg-gray-700" /></div>
          <div className="flex flex-col"><label className="text-sm font-medium mb-1">Horarios</label><input {...register('horariosAtencion')} className="p-3 border rounded-md dark:bg-gray-700" /></div>
          <div className="flex flex-col"><label className="text-sm font-medium mb-1">Facebook</label><input {...register('facebook')} className="p-3 border rounded-md dark:bg-gray-700" /></div>
          <div className="flex flex-col"><label className="text-sm font-medium mb-1">Instagram</label><input {...register('instagram')} className="p-3 border rounded-md dark:bg-gray-700" /></div>
          <div className="flex flex-col"><label className="text-sm font-medium mb-1">Twitter</label><input {...register('twitter')} className="p-3 border rounded-md dark:bg-gray-700" /></div>
        </div>
      </details>

      {/* Botón nativo submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}