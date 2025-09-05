import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const cards = [
  { titulo: 'Donaciones', desc: 'Aportá económicamente para alimentos y medicación.', link: '/donaciones' },
  { titulo: 'Voluntariado', desc: 'Sumate como voluntario en refugios.', link: '/voluntariado' },
  { titulo: 'Hogar de tránsito', desc: 'Abrí tu casa temporalmente hasta la adopción.', link: '/transito' }
];


export default function Sumate() {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Sumate</h1>
        <div />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(c => (
          <Link key={c.link} to={c.link} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:scale-105 transition">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{c.titulo}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}