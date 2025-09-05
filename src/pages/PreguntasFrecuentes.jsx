import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const faqs = [
  { q: '¿Puedo adoptar si vivo en departamento?', a: 'Sí, con balcón cerrado o redes y salidas diarias.' },
  { q: '¿Hay algún costo?', a: 'No; solo asumís gastos veterinarios de entrada.' },
  { q: '¿Puedo devolverlo si no me adapto?', a: 'Sí, sin cargos.' },
  { q: '¿Cuánto tarda el proceso?', a: '24-72 hs hábiles.' },
  { q: '¿Puedo adoptar si tengo niños?', a: 'Sí; recomendamos perros de baja tensión.' },
  { q: '¿Puedo verlo antes de decidir?', a: 'Sí, visita sin compromiso.' }
];

export default function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Preguntas frecuentes</h1>
        <div />
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-6 py-4 font-semibold text-gray-800 dark:text-gray-100"
            >
              {f.q}
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}