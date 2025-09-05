import React from 'react';
import MascotaCreateForm from '../components/MascotaCreateForm';
import { createMascota } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const MascotaCreate = () => {
  const { id } = useParams(); // ← refugioId desde la URL
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const payload = {
      nombre: data.nombre,
      especie: data.especie,
      raza: data.raza,
      edad: Number(data.edad),
      genero: data.genero?.toLowerCase(),
      tamano: data.tamano?.toLowerCase(),
      descripcion: data.descripcion,
      estado: data.estado,
      imagen: data.imagen.trim(), // ✅ ahora es string directo
      refugio: id,
    };

    console.log('📦 Payload enviado:', JSON.stringify(payload, null, 2));

    try {
      await createMascota(payload);
      toast.success('Mascota creada exitosamente');
      navigate(`/refugios/${id}`);
    } catch (err) {
      console.error('❌ Error completo:', err);

      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((e) => {
          toast.error(e.msg || e.message || 'Error desconocido');
        });
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error('Error al crear mascota');
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center mb-8">
          Nueva Mascota
        </h1>
        <MascotaCreateForm onFormSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MascotaCreate;