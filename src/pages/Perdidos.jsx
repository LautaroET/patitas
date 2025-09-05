import React from 'react';

// Simulá datos hasta que tengas endpoint
const perdidos = [
  { id: 1, nombre: 'Thor', especie: 'Perro', foto: '/img/perdidos/thor.jpg', zona: 'Villa Luzuriaga', fecha: '2025-05-10' },
  { id: 2, nombre: 'Mimi', especie: 'Gato', foto: '/img/perdidos/mimi.jpg', zona: 'San Justo', fecha: '2025-05-08' },
  { id: 3, nombre: 'Simón', especie: 'Perro', foto: '/img/perdidos/simon.jpg', zona: 'Morón', fecha: '2025-05-05' }
];

export default function Perdidos() {
  return (
    <section className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400 mb-6">Mascotas perdidas</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {perdidos.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <img src={p.foto} alt={p.nombre} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{p.nombre}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{p.especie} — {p.zona}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Desaparecido el {p.fecha}</p>
              <button className="mt-3 text-sm text-blue-600 dark:text-indigo-400 underline">Reportar avistaje</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 dark:bg-gray-800 rounded-xl p-6">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          ¿Perdiste a tu mascota? <a href="mailto:perdidos@patitas.com" className="underline">Envianos foto y datos</a> para publicarla.
        </p>
      </div>
    </section>
  );
}