import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Loader from './Loader';
import useMeowFact from '../hook/useMeowFact';
import Footer from './Footer';

export default function MeowFactFooter() {
  const { fact, loading, refetch } = useMeowFact();

  return (
    <>
      <section className="bg-gradient-to-r from-indigo-600 to-blue-700 dark:from-gray-800 dark:to-indigo-900 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <i className="bi bi-chat-square-heart-fill text-amber-300" />
              Dato curioso gatuno
            </h3>
            {loading ? (
              <Loader />
            ) : (
              <p className="text-sm italic">“{fact}”</p>
            )}
          </div>

          <button
            onClick={refetch}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Otro dato"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span className="text-sm">Otro</span>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}