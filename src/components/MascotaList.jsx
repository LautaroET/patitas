import React from "react";
import MascotaCard from "./MascotaCard";

function MascotaList({ mascotas }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
      {mascotas.length > 0 ? (
        mascotas.map((mascota) => (
          <MascotaCard key={mascota._id} mascota={mascota} />
        ))
      ) : (
        <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-300">
          No hay mascotas para mostrar. ¡Intenta con otra búsqueda!
        </p>
      )}
    </div>
  );
}

export default MascotaList;