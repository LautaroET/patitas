import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const cards = [
  { titulo: 'Vacunas al día', desc: 'Calendario anual de vacunación.' },
  { titulo: 'Alimentación balanceada', desc: 'Evitá las sobras; elegí alimento premium.' },
  { titulo: 'Castración', desc: 'Reduce riesgos de cáncer y comportamientos indeseados.' },
  { titulo: 'Desparasitación', desc: 'Interna y externa cada 3 meses.' },
  { titulo: 'Ejercicio diario', desc: 'Prevén obesidad y ansiedad.' },
  { titulo: 'Control veterinario', desc: 'Chequeo completo al menos una vez al año.' }
];

export default function ConsejosCuidado() {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Consejos de cuidado</h1>
        <div />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(c => (
          <div key={c.titulo} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{c.titulo}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}