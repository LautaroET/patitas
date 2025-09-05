import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const links = [
  { to: '/consejos-cuidado', titulo: 'Consejos básicos', desc: 'Vacunas, alimentación, castración, etc.' },
  { to: '/preguntas-frecuentes', titulo: 'Preguntas frecuentes', desc: 'Respuestas a las dudas más comunes.' },
  { to: '/blog', titulo: 'Blog', desc: 'Noticias y artículos sobre bienestar animal.' }
];

export default function Cuidados() {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Cuidados</h1>
        <div />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:scale-105 transition">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{l.titulo}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{l.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}