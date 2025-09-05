// src/utils/toastConfig.js
import React, { useEffect } from 'react';
import { toast, Slide } from 'react-toastify';

/* ---------- ESTILOS GLOBALES (opcional) ----------
    Añadí esta línea en main.jsx:

    <ToastContainer {...toastGlobalOptions} />
*/
export const toastGlobalOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  transition: Slide,          // Animación de aparición
  newestOnTop: true,          // Los nuevos arriba
  limit: 5,                   // Máximo de toasts simultáneos
  rtl: false                  // Cambiar a true para RTL
};

/* ---------- FUNCIONES PRE-ESTILIZADAS ---------- */
const baseStyle = {
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,.15)',
  padding: '8px 12px'
};

export const toastSuccess = (msg, opts = {}) =>
  toast.success(msg, {
    ...toastGlobalOptions,
    style: {
      ...baseStyle,
      background: '#10b981', // verde tailwind-500
      boxShadow: '0 4px 12px rgba(16,185,129,.4)'
    },
    icon: '✅',
    ...opts
  });

export const toastError = (msg, opts = {}) =>
  toast.error(msg, {
    ...toastGlobalOptions,
    style: {
      ...baseStyle,
      background: '#ef4444', // rojo tailwind-500
      boxShadow: '0 4px 12px rgba(239,68,68,.4)'
    },
    icon: '❌',
    ...opts
  });

export const toastWarning = (msg, opts = {}) =>
  toast.warning(msg, {
    ...toastGlobalOptions,
    style: {
      ...baseStyle,
      background: '#f59e0b', // ámbar tailwind-500
      boxShadow: '0 4px 12px rgba(245,158,11,.4)'
    },
    icon: '⚠️',
    ...opts
  });

export const toastInfo = (msg, opts = {}) =>
  toast.info(msg, {
    ...toastGlobalOptions,
    style: {
      ...baseStyle,
      background: '#3b82f6', // azul tailwind-500
      boxShadow: '0 4px 12px rgba(59,130,246,.4)'
    },
    icon: 'ℹ️',
    ...opts
  });

/* ---------- TOAST DE CARGA / PROMESA ---------- */
export const toastLoading = (msg = 'Cargando...', opts = {}) =>
  toast.loading(msg, {
    ...toastGlobalOptions,
    style: {
      ...baseStyle,
      background: '#6b7280' // gris neutro
    },
    icon: '⏳',
    ...opts
  });

export const toastPromise = (promise, { pending, success, error }, opts = {}) =>
  toast.promise(promise, {
    pending: { render: pending || 'Procesando...', icon: '⏳' },
    success: { render: success || 'Éxito', icon: '✅' },
    error: { render: error || 'Error', icon: '❌' }
  }, {
    ...toastGlobalOptions,
    ...opts
  });

/* ---------- TOAST CON ACCIÓN (ej. confirmar) ---------- */
export const toastConfirmAction = ({ title, onConfirm, onCancel }) =>
  toast(({ closeToast }) => {
    // Captura Enter/Escape para confirmar/cancelar con teclado
    useEffect(() => {
      const handleKey = (e) => {
        if (e.key === 'Enter') {
          onConfirm();
          closeToast();
        }
        if (e.key === 'Escape') {
          if (onCancel) onCancel();
          closeToast();
        }
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{title}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          >
            Sí
          </button>
          <button
            onClick={() => {
              if (onCancel) onCancel();
              closeToast();
            }}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm"
          >
            No
          </button>
        </div>
        <small className="text-gray-400 text-xs">Enter para Sí / Esc para No</small>
      </div>
    );
  }, { closeButton: false, autoClose: false });
