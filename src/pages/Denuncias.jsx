import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  denunciante: yup.string().required('Tu nombre'),
  telefono: yup.string().required('Teléfono de contacto'),
  direccionHecho: yup.string().required('Dónde ocurrió'),
  descripcion: yup.string().min(20, 'Describí con más detalle').required('Contanos qué viste'),
  fecha: yup.date().max(new Date(), 'No puede ser futura').required('Fecha aproximada')
});

export default function Denuncias() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
    alert('Denuncia recibida. Nos pondremos en contacto en 24 hs.');
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400 mb-4">Denunciar maltrato</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Tu identidad será confidencial. Completá el formulario y nosotros derivamos la denuncia a la fiscalía correspondiente.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('denunciante')} placeholder="Tu nombre" className="input" />
        {errors.denunciante && <span className="text-red-500 text-sm">{errors.denunciante.message}</span>}

        <input {...register('telefono')} placeholder="Teléfono" className="input" />
        {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}

        <input {...register('direccionHecho')} placeholder="Dirección donde viste el hecho" className="input" />
        {errors.direccionHecho && <span className="text-red-500 text-sm">{errors.direccionHecho.message}</span>}

        <label className="block text-sm text-gray-600 dark:text-gray-400">Fecha aproximada</label>
        <input type="date" {...register('fecha')} className="input" />
        {errors.fecha && <span className="text-red-500 text-sm">{errors.fecha.message}</span>}

        <textarea {...register('descripcion')} placeholder="Describí lo que viste (mínimo 20 caracteres)" className="input h-32" />
        {errors.descripcion && <span className="text-red-500 text-sm">{errors.descripcion.message}</span>}

        <button type="submit" className="btn">Enviar denuncia</button>
      </form>
    </section>
  );
}