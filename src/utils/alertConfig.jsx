import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* ---------- OPCIONES GLOBALES ---------- */
export const swalGlobalOptions = {
  customClass: {
    popup: 'rounded-xl shadow-xl',
    title: 'font-semibold text-lg',
    confirmButton: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md',
    cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md',
  },
  buttonsStyling: false,
  allowOutsideClick: false,
  showCloseButton: true,
  backdrop: true,
  timerProgressBar: true,
  reverseButtons: true,
};

/* ---------- ALERTAS RÁPIDAS ---------- */
export const alertSuccess = (title, text = '', opts = {}) =>
  Swal.fire({
    title,
    text,
    icon: 'success',
    ...swalGlobalOptions,
    ...opts,
  });

export const alertError = (title, text = '', opts = {}) =>
  Swal.fire({
    title,
    text,
    icon: 'error',
    ...swalGlobalOptions,
    ...opts,
  });

export const alertWarning = (title, text = '', opts = {}) =>
  Swal.fire({
    title,
    text,
    icon: 'warning',
    ...swalGlobalOptions,
    ...opts,
  });

export const alertInfo = (title, text = '', opts = {}) =>
  Swal.fire({
    title,
    text,
    icon: 'info',
    ...swalGlobalOptions,
    ...opts,
  });

export const alertQuestion = (title, text = '', opts = {}) =>
  Swal.fire({
    title,
    text,
    icon: 'question',
    ...swalGlobalOptions,
    ...opts,
  });

/* ---------- ALERTA DE CARGA ---------- */
export const alertLoading = (title = 'Cargando...', text = '', opts = {}) => {
  Swal.fire({
    title,
    text,
    ...swalGlobalOptions,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    ...opts,
  });
};

/* ---------- CONFIRMACIÓN CON CALLBACKS ---------- */
export const alertConfirmAction = ({
  title,
  text = '',
  confirmText = 'Sí',
  cancelText = 'No',
  onConfirm,
  onCancel,
  icon = 'warning',
  opts = {}
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...swalGlobalOptions,
    ...opts,
  }).then((result) => {
    if (result.isConfirmed && onConfirm) onConfirm();
    else if (result.isDismissed && onCancel) onCancel();
  });
};

/* ---------- ALERTA CON INPUT ---------- */
export const alertPrompt = async ({
  title,
  text = '',
  input = 'text', // text, email, password, textarea, select, radio...
  inputOptions,
  placeholder,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  opts = {}
}) => {
  const { value } = await Swal.fire({
    title,
    text,
    input,
    inputOptions,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...swalGlobalOptions,
    ...opts,
  });
  return value;
};
