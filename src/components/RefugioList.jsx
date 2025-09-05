import React from "react";
import RefugioCard from "./RefugioCard";

function RefugioList({ refugios }) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
      {refugios.length > 0 ? (
        <>
          {refugios.map((refugio) => (
            <RefugioCard key={refugio._id} refugio={refugio} />
          ))}
          
          {/* El paginador se renderiza ahora en el componente padre, Refugios.jsx */}
        </>
      ) : (
        <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-300">
          No hay refugios para mostrar. ¡Vuelve a intentarlo más tarde!
        </p>
      )}
    </div>
  );
}

export default RefugioList;