import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const pasos = [
  { num: 1, titulo: 'Elegí una mascota', desc: 'Explorá perfiles en la sección Mascotas. Podés filtrar por tamaño, edad y personalidad.' },
  { num: 2, titulo: 'Completá el formulario', desc: 'Hacé clic en “Adoptar” y envianos tus datos. No te lleva más de 5 minutos.' },
  { num: 3, titulo: 'Entrevista virtual', desc: 'Nos contactaremos para coordinar una videollamada y resolver dudas.' },
  { num: 4, titulo: 'Visita de pre-adopción', desc: 'Conocé a la mascota en su refugio o en tu casa. Verificá que haya buena onda.' },
  { num: 5, titulo: 'Firma del contrato', desc: 'Firmamos un acuerdo de cuidado responsable. ¡Listo para llevarla!' }
];

const requisitos = [
  'Ser mayor de 18 años y presentar DNI vigente.',
  'Comprobante de domicilio (a tu nombre o familiar).',
  'Compromiso de esterilización a los 6 meses si es cachorro.',
  'No tener antecedentes de maltrato animal.',
  'Permiso del dueño del inmueble si es alquiler.',
  'Asumir gastos de vacunas, desparasitación y alimentación.',
  'Firmar contrato de adopción responsable.',
  'Aceptar una visita de seguimiento a los 30 días.'
];

const faqs = [
  { q: '¿Puedo adoptar si vivo en departamento?', a: 'Sí, siempre que permitas salidas diarias y tengas balcón cerrado o redes de seguridad.' },
  { q: '¿Hay algún costo?', a: 'No. La adopción es gratuita. Solo te pedimos que asumas los gastos veterinarios de entrada.' },
  { q: '¿Puedo devolverlo si no me adapto?', a: 'Sí. Firmamos un compromiso de devolución al refugio, sin cargos.' },
  { q: '¿Puedo verlo antes de decidir?', a: 'Por supuesto. Coordinamos una visita sin compromiso.' },
  { q: '¿Cuánto tarda el proceso?', a: 'Entre 24 y 72 hs hábiles una vez que completás el formulario.' },
  { q: '¿Puedo adoptar si tengo niños?', a: 'Sí. Recomendamos perros de baja tensión y tamaño medio-grande.' }
];

export default function ComoAdoptar() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl space-y-12">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)}>← Volver</Button>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-indigo-400">Cómo adoptar</h1>
        <div /> {/* spacer para centrar el título si querés */}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pasos.map(p => (
          <div key={p.num} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="text-amber-500 text-4xl font-black mb-2">{p.num}</div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{p.titulo}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-indigo-400 mb-4">Requisitos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {requisitos.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-indigo-400 mb-4">Preguntas frecuentes</h2>
        <div className="space-y-3">
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
      </div>
    </section>
  );
}