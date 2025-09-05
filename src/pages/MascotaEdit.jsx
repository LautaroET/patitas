import React from 'react';
import MascotaEditForm from '../components/MascotaEditForm';
import { updateMascota } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const MascotaEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ← ID de la mascota a editar

  const handleSubmit = async (data) => {
    // ✅ Mapea al formato que espera tu backend
    const payload = {
      nombre: data.nombre,
      raza: data.raza,
      edad: Number(data.edad),
      genero: data.genero,
      tamano: data.tamano,
      descripcion: data.descripcion,
      estado: data.estado,
      imagen: data.imagen.trim(), // ← string directo
      refugio: data.refugio, // ← ID del refugio (no modifiable)
    };

    console.log('📦 Payload enviado a updateMascota:', JSON.stringify(payload, null, 2));

    try {
      await updateMascota(id, payload);
      toast.success('Mascota actualizada exitosamente!');
      navigate(`/mascotas/${id}`);
    } catch (error) {
      toast.error('Hubo un error al actualizar la mascota.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-blue-400 text-center mb-8">
          Editar Mascota
        </h1>
        <MascotaEditForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MascotaEdit;