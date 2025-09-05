import api from '../services/apiService'; 

// LOGIN
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.token) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

// REGISTRO
export const register = async ({
  username,
  email,
  password,
  nombreCompleto,
  fechaNacimiento,
}) => {
  const { data } = await api.post('/auth/register', {
    username,
    email,
    password,
    nombreCompleto,
    fechaNacimiento,
  });
  if (data.token) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

// LOGOUT
export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  window.location.href = '/';
};

// USUARIO ACTUAL
export const getUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem('user'));
  } catch {
    return null;
  }
};

// ¿HAY TOKEN?
export const isAuthenticated = () => !!sessionStorage.getItem('token');