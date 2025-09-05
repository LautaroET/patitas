import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const schema = yup.object({
  nombre: yup.string().required('Tu nombre es obligatorio'),
  telefono: yup.string().required('Un teléfono de contacto'),
  localidad: yup.string().required('¿Dónde vivís?'),
  disponibilidad: yup.string().required('Contanos qué días/horarios podés')
});

export default function Voluntariado() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
    alert('¡Formulario enviado! Nos contactaremos en 48 hs.');
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Voluntariado</h1>
        <div />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('nombre')} placeholder="Nombre completo" className="input" />
        {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}

        <input {...register('telefono')} placeholder="Teléfono" className="input" />
        {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}

        <input {...register('localidad')} placeholder="Localidad" className="input" />
        {errors.localidad && <span className="text-red-500 text-sm">{errors.localidad.message}</span>}

        <textarea {...register('disponibilidad')} placeholder="Disponibilidad (días y horarios)" className="input h-24" />
        {errors.disponibilidad && <span className="text-red-500 text-sm">{errors.disponibilidad.message}</span>}

        <Button type="submit">Enviar solicitud</Button>
      </form>
    </section>
  );
}

/* Reutilizá tus clases de input */
const input = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500';