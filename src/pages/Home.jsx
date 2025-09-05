import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white transition-colors duration-700 dark:from-indigo-900 dark:to-gray-900">
      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 dark:text-gray-200">
          ¡Bienvenido a{' '}
          <span className="text-amber-300">Patitas</span> al{' '}
          <span className="text-amber-300">Rescate</span>! 🐾
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Conectamos mascotas en busca de un hogar con personas que quieren
          ofrecerles una nueva vida llena de amor.
        </p>

        {/* Imagen con efecto suave */}
        <div className="flex justify-center mb-12">
          <img
            className="rounded-2xl shadow-2xl max-w-full h-auto border-4 border-amber-300 transform transition hover:scale-105 duration-500"
            src="/img/home-presenta.webp"
            alt="Perro y gato juntos, símbolo de adopción"
          />
        </div>

        {/* Botones centrados y con iconos */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/como-adoptar"
            className="bg-amber-300 hover:bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900"
          >
            ❤️ Quiero Adoptar
          </Link>
          <Link
            to="/mascotas"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-gray-100"
          >
            🔍 Ver Mascotas
          </Link>
        </div>

        {/* Cifras rápidas (opcional, sin romper estilo) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl font-bold text-amber-300">+300</p>
            <p className="text-sm text-blue-100 dark:text-gray-300">Adopciones concretadas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl font-bold text-amber-300">+50</p>
            <p className="text-sm text-blue-100 dark:text-gray-300">Refugios aliados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl font-bold text-amber-300">100%</p>
            <p className="text-sm text-blue-100 dark:text-gray-300">Adopciones responsables</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;