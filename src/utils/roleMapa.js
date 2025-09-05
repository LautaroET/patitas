//esto es un helper

export const roleMapa = {
  /* -------------------------------------------------
    1. comun
     ------------------------------------------------- */
  '68ba6f2ba2733f17d4b12f73': {
    name: 'comun',
    permissions: [
      'refugios:create',              // btn “Crear refugio”
      'solicitudes:adopcion:create',  // btn “Adoptar” en ficha mascota
      'solicitudes:adopcion:listOwn', // menú “Mis solicitudes de adopción”
      'solicitudes:dar:create',       // btn “Dar en adopción”
      'solicitudes:dar:listOwn'       // menú “Mis solicitudes de dar”
    ]
  },

  /* -------------------------------------------------
    2. refugio
     ------------------------------------------------- */
  '68ba6f2ca2733f17d4b12f76': {
    name: 'refugio',
    permissions: [
      'mascotas:create',               // btn “Nueva mascota”
      'mascotas:update',               // btn “Editar mascota”
      'mascotas:delete',               // btn “Eliminar mascota”
      'refugios:readOwn',              // menú “Mi refugio”
      'refugios:delete',               // btn “Eliminar refugio”
      'refugios:update',               // btn "Edita el propio refugio"
      'solicitudes:adopcion:listRefuge', // pestaña “Solicitudes de adopción”
      'solicitudes:adopcion:patch',    // btn “Aceptar / Rechazar adopción”
      'solicitudes:dar:listRefuge',    // pestaña “Solicitudes para recibir”
      'solicitudes:dar:patch'          // btn “Aceptar / Rechazar dar”
    ]
  },

  /* -------------------------------------------------
    3. admin (reservado)
     ------------------------------------------------- */
  '68ba6f2ca2733f17d4b12f79': {
    name: 'admin',
    permissions: ['admin:all']         // todo habilitado
  }
};