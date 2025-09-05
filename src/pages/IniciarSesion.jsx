import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const MySwal = withReactContent(Swal);

const schema = yup.object().shape({
  email: yup.string().email('Ingresa un correo válido.').required('El correo es obligatorio.'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres.').required('La contraseña es obligatoria.'),
});

const IniciarSesion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading('Iniciando sesión...');

    try {
      const res = await login(data.email, data.password);
      toast.dismiss(toastId);

      if (res) {
        await MySwal.fire({
          icon: 'success',
          title: '¡Bienvenido de nuevo!',
          text: 'Has iniciado sesión con éxito.',
          showConfirmButton: false,
          timer: 2000,
          didClose: () => navigate('/perfil'),
        });
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.dismiss(toastId);
      MySwal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: error?.response?.data?.message || error.message || 'Revisa tus datos e inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Volver atrás
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/registro')}
                className="text-blue-600 dark:text-indigo-500 hover:text-blue-700 dark:hover:text-indigo-600 transition-colors font-medium"
              >
                Regístrate
              </button>
            </span>
          </div>
        </form>

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default IniciarSesion;