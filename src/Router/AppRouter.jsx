// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import PermissionRoute from '../components/PermissionRoute';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home';
import Refugios from '../pages/Refugio';
import RefugioDetail from '../pages/RefugioDetail';
import NotFound from '../pages/NotFound';
import Mascotas from '../pages/Mascota';
import MascotaDetail from '../pages/MascotaDetail';
import Authentication from '../pages/Authentication';
import IniciarSesion from '../pages/IniciarSesion';
import Registrarse from '../pages/Registrarse';
import UserProfile from '../pages/UserProfile';
import RefugioCreate from '../pages/RefugioCreate';
import RefugioEdit from '../pages/RefugioEdit';
import MascotaCreate from '../pages/MascotaCreate';
import MascotaEdit from '../pages/MascotaEdit';
import AccessDenied from '../components/AccessDenied';
import AdoptarPage from '../pages/AdoptarPage';
import MisSolicitudesAdopcion from '../pages/MisSolicitudesAdopcion';
import SolicitudesParaMiRefugio from '../pages/SolicitudesRefugioAdopcion'; // ✅ CORREGIDO
import DarEnAdopcionForm from '../pages/DarEnAdopcionForm';
import SolicitudesDarEnAdopcionRefugio from '../pages/SolicitudesDarEnAdopcionRefugio';

import ComoAdoptar from '../pages/ComoAdoptar';
import ConsejosCuidado from '../pages/ConsejosCuidado';
import PreguntasFrecuentes from '../pages/PreguntasFrecuentes';
import Transito from '../pages/Transito';
import Denuncias from '../pages/Denuncias';
import Perdidos from '../pages/Perdidos';
import Blog from '../pages/Blog';
import Donaciones from '../pages/Donaciones';
import Voluntariado from '../pages/Voluntariado';
import Sumate from '../pages/Sumate';
import Cuidados from '../pages/Cuidados'

function AppRouter() {
  return (
    <Routes>
      {/* ✅ Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/refugios" element={<Refugios />} />
      <Route path="/refugios/:id" element={<RefugioDetail />} />
      <Route path="/mascotas" element={<Mascotas />} />
      <Route path="/mascotas/:id" element={<MascotaDetail />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/login" element={<IniciarSesion />} />
      <Route path="/registro" element={<Registrarse />} />
      <Route path="/access-denied" element={<AccessDenied />} />


      <Route path="/sumate" element={<Sumate />} />
      <Route path="/cuidados" element={<Cuidados />} />
      <Route path="/como-adoptar" element={<ComoAdoptar />} />
      <Route path="/consejos-cuidado" element={<ConsejosCuidado />} />
      <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
      <Route path="/transito" element={<Transito />} />
      <Route path="/denuncias" element={<Denuncias />} />
      <Route path="/perdidos" element={<Perdidos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/donaciones" element={<Donaciones />} />
      <Route path="/voluntariado" element={<Voluntariado />} />

      {/* ✅ Protegidas por permisos */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/refugios/nuevo"
        element={
          <PermissionRoute permission="refugios:create">
            <RefugioCreate />
          </PermissionRoute>
        }
      />
      <Route
        path="/refugios/:id/editar"
        element={
          <PermissionRoute permission="refugios:update">
            <RefugioEdit />
          </PermissionRoute>
        }
      />
      <Route
        path="/refugios/:id/mascotas/nueva"
        element={
          <PermissionRoute permission="mascotas:create">
            <MascotaCreate />
          </PermissionRoute>
        }
      />
      <Route
        path="/mascotas/:id/editar"
        element={
          <PermissionRoute permission="mascotas:update">
            <MascotaEdit />
          </PermissionRoute>
        }
      />

      {/* ✅ Formulario de adopción */}
      <Route
        path="/mascotas/:id/adoptar"
        element={
          <PermissionRoute permission="solicitudes:adopcion:create">
            <AdoptarPage />
          </PermissionRoute>
        }
      />

      <Route
        path="/mis-solicitudes-adopcion"
        element={
          <PermissionRoute permission="solicitudes:adopcion:listOwn">
            <MisSolicitudesAdopcion />
          </PermissionRoute>
        }
      />

      <Route
        path="/solicitudes-adopcion-refugio"
        element={
          <PermissionRoute permission="solicitudes:adopcion:listRefuge">
            <SolicitudesParaMiRefugio />
          </PermissionRoute>
        }
      />

      <Route
        path="/refugios/:id/dar-en-adopcion"
        element={
          <PermissionRoute permission="solicitudes:dar:create">
            <DarEnAdopcionForm />
          </PermissionRoute>
        }
      />

      <Route
        path="/solicitudes-dar-en-adopcion-refugio"
        element={
          <PermissionRoute permission="solicitudes:dar:listRefuge">
            <SolicitudesDarEnAdopcionRefugio />
          </PermissionRoute>
        }
      />

      {/* ✅ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;