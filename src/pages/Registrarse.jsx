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

/* ---------- validaciones ---------- */
const schema = yup.object().shape({
  username: yup.string().min(3, 'Mínimo 3 caracteres').required('Usuario obligatorio'),
  nombre: yup.string().required('Nombre obligatorio'),
  apellido: yup.string().required('Apellido obligatorio'),
  email: yup.string().email('Correo inválido').required('Correo obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
  dia: yup.number().min(1, 'Día inválido').max(31, 'Día inválido').required('Día obligatorio'),
  mes: yup.number().min(1, 'Mes inválido').max(12, 'Mes inválido').required('Mes obligatorio'),
  anio: yup
    .number()
    .min(1900, 'Año inválido')
    .max(new Date().getFullYear(), 'Año no puede ser futuro')
    .required('Año obligatorio'),
});

/* ---------- componente ---------- */
const Registrarse = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);

    const { confirmPassword: _, dia, mes, anio, ...rest } = data;
    
    // Construir la fecha de nacimiento como un objeto Date
    const fechaNacimiento = new Date(anio, mes - 1, dia);

    // Validar si la fecha es correcta antes de enviar
    if (isNaN(fechaNacimiento.getTime())) {
      setLoading(false);
      MySwal.fire({
        icon: 'error',
        title: 'Fecha inválida',
        text: 'Por favor, ingresa una fecha de nacimiento válida.',
      });
      return;
    }

    const userData = {
      username: rest.username,
      email: rest.email,
      password: rest.password,
      nombreCompleto: { nombre: rest.nombre, apellido: rest.apellido },
      fechaNacimiento, // Enviamos el objeto Date
    };

    const toastId = toast.loading('Registrando...');

    const res = await register(userData);
    toast.dismiss(toastId);

    setLoading(false);

    if (res?.success) {
      await MySwal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: '¡Bienvenido a Patitas al Rescate!',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/perfil');
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: res?.error || 'Intenta de nuevo más tarde',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Volver atrás
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Registrarse</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
            <legend className="px-2 text-lg font-semibold text-gray-800 dark:text-white">Datos de cuenta</legend>
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de usuario</label>
                <input type="text" {...field('username')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                <input type="email" {...field('email')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
                <input type="password" {...field('password')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar contraseña</label>
                <input type="password" {...field('confirmPassword')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
            <legend className="px-2 text-lg font-semibold text-gray-800 dark:text-white">Información personal</legend>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                  <input type="text" {...field('nombre')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
                  <input type="text" {...field('apellido')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                  {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de nacimiento</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" placeholder="Día" {...field('dia')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                  <input type="number" placeholder="Mes" {...field('mes')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                  <input type="number" placeholder="Año" {...field('anio')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
                </div>
                {(errors.dia || errors.mes || errors.anio) && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dia?.message || errors.mes?.message || errors.anio?.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 dark:text-indigo-500 hover:text-blue-700 dark:hover:text-indigo-600 transition-colors font-medium"
              >
                Inicia sesión
              </button>
            </span>
          </div>
        </form>

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Registrarse;