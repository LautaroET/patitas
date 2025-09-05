// src/pages/AdoptarPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMascotaDetail } from '../hook/useMascotaDetail';
import AdoptarForm from '../components/AdoptarForm';
import Loader from '../components/Loader';

const AdoptarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mascota, isLoading, error } = useMascotaDetail(id);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error al cargar mascota.</p>;
  if (!mascota?.refugio) return <p className="text-center text-gray-500">Mascota sin refugio asociado.</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-blue-400 mb-6">
          Formulario de Adopción
        </h1>
        <AdoptarForm
          mascotaId={id}
          refugioId={mascota.refugio._id}
          onSuccess={() => navigate('/mascotas')}
        />
      </div>
    </div>
  );
};

export default AdoptarPage;