import React, { createContext, useState, useEffect } from "react";

// Crea un nuevo contexto llamado TemaContext para gestionar el tema.
export const TemaContext = createContext();

const TemaProvider = ({ children }) => {
  // Estado para el tema oscuro, inicializado desde localStorage.
  const [temaOscuro, setTemaOscuro] = useState(() => {
    const guardado = localStorage.getItem("temaOscuro");
    return guardado ? JSON.parse(guardado) : false;
  });

  /**
   * Hook de efecto que se ejecuta cada vez que cambia el valor de `temaOscuro`.
   * Guarda el estado en localStorage y actualiza la clase 'dark' en el elemento <html>.
   */
  useEffect(() => {
    localStorage.setItem("temaOscuro", JSON.stringify(temaOscuro));

    if (temaOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaOscuro]);

  const alternarTema = () => {
    setTemaOscuro((prev) => !prev);
  };

  // Provee el estado y la función para alternar el tema a los componentes hijos.
  return (
    <TemaContext.Provider value={{ temaOscuro, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export default TemaProvider;



