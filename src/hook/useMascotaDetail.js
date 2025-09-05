import { useState, useEffect } from 'react';
import { getMascotaById, fetchRefugioById } from '../services/apiService';

export const useMascotaDetail = (id) => {
  const [mascota, setMascota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMascotaDetail = async () => {
      if (!id) {
        setIsLoading(false);
        setError('ID de mascota no válido.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMascotaById(id);
        if (!data || !data.data) {
          setError('No se pudo cargar la mascota.');
          return;
        }

        const mascotaData = data.data;
        let refugio = null;

        // ✅ Solución: Verifica si el ID del refugio existe antes de hacer la llamada a la API
        if (mascotaData.refugio) {
          try {
            const refugioRes = await fetchRefugioById(mascotaData.refugio);
            refugio = refugioRes.data;
          } catch (refugioError) {
            console.error("Error fetching refugio:", refugioError);
            // Continúa sin el refugio si hay un error
          }
        }

        const mapped = {
          nombre: mascotaData.nombre ?? 'Sin nombre',
          edad: mascotaData.edad ?? null,
          genero: mascotaData.genero ?? null,
          tamano: mascotaData.tamano ?? null,
          descripcion: mascotaData.descripcion ?? null,
          caracteristicas: mascotaData.caracteristicas ?? [],
          estado: mascotaData.estado ?? 'disponible',
          imagen: mascotaData.imagen ?? [],
          refugio,
          raza: mascotaData.raza ?? null,
        };

        setMascota(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMascotaDetail();
  }, [id]);

  return { mascota, isLoading, error };
};
