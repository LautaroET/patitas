# 🐾 Patitas al Rescate – Frontend

Proyecto **React + Vite + Tailwind** que conecta mascotas en adopción con futuros hogares.  
Stack: React 18, React Router 6, Context API, Axios, Yup + React-Hook-Form, Toastify, SweetAlert2, Tailwind CSS 3 (dark-mode nativo).

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/patitas-frontend.git
cd patitas-frontend
npm install

Variables de entorno necesarias:

cp .env.example .env
# Completa:
VITE_API_URL=https://api.patitas.com
VITE_ROLE_COMUN=?
VITE_ROLE_REFUGIO=?
VITE_ROLE_ADMIN=?

Levantar en local:
npm run dev

📁 Estructura (simplificada)

src/
├─ components/        # UI reutilizable (Button, Loader, Modal…)
├─ pages/             # Rutas públicas y protegidas
├─ hooks/             # Custom hooks (useMascotas, useRefugioDetail…)
├─ context/           # AuthContext, FavoritosContext, TemaContext
├─ services/          # Llamadas Axios (apiService.js)
├─ utils/             # Helpers, permisos, schemas Yup
├─ Router/            # AppRouter.jsx (definición de rutas)
└─ App.jsx            # Punto de entrada + providers

🔐 Flujo de autenticación
Login / Register → JWT guardado en sessionStorage.
AuthContext decodifica el rol y expone user.permissions.
PermissionRoute valida contra can(permission) antes de renderizar.
🎨 Dark mode
Toggle en Header → TemaContext añade/elimina clase .dark en <html>.
Tailwind hace el resto: dark:bg-gray-800, dark:text-gray-100, etc.
🧪 Validaciones
Formularios centralizados con Yup:

// utils/schemas.js
export const fechaSchema = object({
  dia: number().min(1).max(31).required(),
  mes: number().min(1).max(12).required(),
  anio: number().min(1900).max(new Date().getFullYear()).required(),
});

Uso en Registrarse → reutilizable en cualquier otro form que pida fecha.
♻️ Optimizaciones aplicadas
| Optimización           | Detalle                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **DRY**                | Interceptor Axios único → sin `.catch(handleError)` repetido. |
| **Memo**               | `Header` envuelto en `React.memo` para evitar re-renders.     |
| **Lazy loading**       | Rutas públicas cargadas con `React.lazy` (código split).      |
| **Imagen placeholder** | Helper `getImageUrl()` centralizado.                          |
| **Cleanup effects**    | Flags de cancelación en hooks async.                          |
| **Accesibilidad**      | `aria-label` en paginación y botones interactivos.            |
🚀 Build & deploy
npm run build
# Carpeta dist/ lista para Netlify, Vercel, S3, etc.

📋 Pendientes / roadmap
[ ] Pasarela de pago para donaciones.
[ ] Chat en tiempo real entre refugio y adoptante.
[ ] PWA → instalable offline.
[ ] Tests unitarios (Vitest + React Testing Library).
🤝 Contribuir
Fork → feature branch → PR.
Seguí el linter: npm run lint.
Actualizá el README si agregás variables de entorno.

📄 Licencia
MIT – Lautaro Tapia 2025
¡Gracias por salvar patitas! 🐶🐱