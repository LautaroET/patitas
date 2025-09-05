import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const posts = [
  {
    id: 1,
    titulo: '10 consejos para el primer día con tu mascota adoptada',
    fecha: '2025-05-20',
    resumen: 'Cómo preparar la casa, qué comprar y cómo hacer que el primer día sea tranquilo para todos.'
  },
  {
    id: 2,
    titulo: '¿Por qué castrar es un acto de amor?',
    fecha: '2025-05-15',
    resumen: 'Datos duros sobre sobrepoblación y beneficios médicos de la castración temprana.'
  },
  {
    id: 3,
    titulo: 'Mitos y verdades sobre los gatos negros',
    fecha: '2025-05-10',
    resumen: 'Desterramos supersticiones y celebramos a estos felinos que se quedan últimos en ser adoptados.'
  }
];

export default function Blog() {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Blog</h1>
        <div />
      </div>

      <div className="space-y-6">
        {posts.map(p => (
          <article key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{p.titulo}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{p.fecha}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.resumen}</p>
            <button className="mt-3 text-sm text-blue-600 dark:text-indigo-400 underline">
              Leer más →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}