import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Donaciones() {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Donaciones</h1>
        <div />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>CBU:</strong> 0000003100000000000000
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Alias:</strong> PATITAS.AL.RESCATE
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cada aporte destina el 100 % a alimentos, medicación y castraciones.
        </p>
      </div>
    </section>
  );
}