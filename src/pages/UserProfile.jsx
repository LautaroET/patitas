import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import RoleDashboard from '../components/RoleDashboard'; // 👈 Importamos
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UserProfile = () => {
  const { user, logout } = useAuth();
console.log("🔍 Usuario completo:", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    });
    if (result.isConfirmed) {
      logout();
      navigate('/');
    }
  };

  if (!user) {
    return <p className="text-center mt-10">No hay usuario logueado.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Mi Perfil</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nombre de usuario</label>
            <p className="text-lg text-gray-900 dark:text-white">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Correo electrónico</label>
            <p className="text-lg text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Rol</label>
            <p className="text-lg text-gray-900 dark:text-white capitalize">{user.role}</p>
          </div>
        </div>

        {/* 👇 Dashboard dinámico según rol */}
        <div className="mb-6">
          <RoleDashboard user={user} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button onClick={handleLogout} variant="danger" className="w-full">
            Cerrar sesión
          </Button>
          <Button onClick={() => navigate(-1)} variant="secondary" className="w-full">
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;