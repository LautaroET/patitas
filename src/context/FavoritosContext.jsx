import { createContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const FavoritosContext = createContext();

const FavoritosProvider = ({ children }) => {
  // Estado inicial seguro con validación
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem("favoritos");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validar la estructura del objeto
        return {
          refugios: Array.isArray(parsed.refugios) ? parsed.refugios : [],
          mascotas: Array.isArray(parsed.mascotas) ? parsed.mascotas : []
        };
      }
      return { refugios: [], mascotas: [] };
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      return { refugios: [], mascotas: [] };
    }
  });

  const prevFavoritosRef = useRef(favoritos);

  // Función segura para agregar favoritos
  const agregarAFavoritos = (item, tipo) => {
    if (!item || !item.id || !['refugios', 'mascotas'].includes(tipo)) {
      console.error("Datos inválidos para agregar a favoritos");
      return;
    }

    setFavoritos(prev => {
      const currentList = Array.isArray(prev[tipo]) ? prev[tipo] : [];
      const existe = currentList.some(fav => fav.id === item.id);
      
      if (existe) {
        toast.info(`Este ${tipo === 'refugios' ? 'refugio' : 'mascota'} ya está en favoritos`);
        return prev;
      }

      return {
        ...prev,
        [tipo]: [...currentList, item]
      };
    });
  };

  // Función segura para eliminar favoritos
  const eliminarDeFavoritos = (id, tipo) => {
    if (!id || !['refugios', 'mascotas'].includes(tipo)) {
      console.error("Datos inválidos para eliminar de favoritos");
      return;
    }

    setFavoritos(prev => ({
      ...prev,
      [tipo]: Array.isArray(prev[tipo]) ? prev[tipo].filter(item => item.id !== id) : []
    }));
    toast.warn(`${tipo === 'refugios' ? 'Refugio' : 'Mascota'} eliminado de favoritos`);
  };

  // Función para vaciar favoritos
  const vaciarFavoritos = (tipo) => {
    if (!['refugios', 'mascotas'].includes(tipo)) {
      console.error("Tipo inválido para vaciar favoritos");
      return;
    }

    setFavoritos(prev => ({
      ...prev,
      [tipo]: []
    }));
    toast.warn(`Favoritos de ${tipo} vaciados`);
  };

  // Efecto para persistencia con validación
  useEffect(() => {
    try {
      localStorage.setItem("favoritos", JSON.stringify({
        refugios: Array.isArray(favoritos.refugios) ? favoritos.refugios : [],
        mascotas: Array.isArray(favoritos.mascotas) ? favoritos.mascotas : []
      }));
      prevFavoritosRef.current = favoritos;
    } catch (error) {
      console.error("Error al guardar favoritos:", error);
    }
  }, [favoritos]);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        agregarAFavoritos,
        eliminarDeFavoritos,
        vaciarFavoritos
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosProvider;






