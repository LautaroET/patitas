import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.response.use(
  res => res,
  err => {
    console.error('⛔ API Error:', err.response?.data || err.message);
    return Promise.reject(err.response?.data || err);
  }
);

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ===== AUTH =====
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const registerUser = (userData) => api.post('/api/auth/register', userData);

// ===== REFUGIOS =====
export const fetchAllRefugios = (search = '') =>
  api.get(`/api/refugios?search=${encodeURIComponent(search)}`);

export const fetchRefugioById = (id) =>
  api.get(`/api/refugios/${id}`);

export const createRefugio = (refugioData) =>
  api.post('/api/refugios', refugioData);

export const updateMiRefugio = (data) => api.put('/api/refugios/yo', data);

export const deleteRefugio = () =>
  api.delete('/api/refugios');

export const fetchMiRefugio = () => api.get('/api/refugios/yo/mi');

// ===== MASCOTAS =====
export const getAllMascotas = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return api.get(`/api/mascotas?${params.toString()}`);
};

export const getMascotaById = (id) =>
  api.get(`/api/mascotas/${id}`);

export const createMascota = (mascotaData) =>
  api.post('/api/mascotas', mascotaData);

export const updateMascota = (id, mascotaData) =>
  api.put(`/api/mascotas/${id}`, mascotaData);

export const deleteMascota = (id) =>
  api.delete(`/api/mascotas/${id}`);

export const getMascotasByRefugio = (refugioId) =>
  api.get(`/api/mascotas?refugio=${refugioId}`);

// ===== SOLICITUDES =====
// Adopción
export const createAdoptionRequest = (data) =>
  api.post('/api/solicitudes/adopcion', data);

export const getAdoptionRequestsByUser = () =>
  api.get('/api/solicitudes/adopcion/usuario');

export const getAdoptionRequestsByRefugio = () =>
  api.get('/api/solicitudes/adopcion/refugio');

export const updateAdoptionRequest = (id, estado) =>
  api.put(`/api/solicitudes/adopcion/${id}`, { estado });

// Dar en adopción
export const createGiveAdoptionRequest = (data) =>
  api.post('/api/solicitudes/dar-en-adopcion', data);

export const getGiveAdoptionRequestsByUser = () =>
  api.get('/api/solicitudes/dar-en-adopcion/usuario');

export const getGiveAdoptionRequestsByRefugio = () =>
  api.get('/api/solicitudes/dar-en-adopcion/refugio');

export const updateGiveAdoptionRequest = (id, estado) =>
  api.put(`/api/solicitudes/dar-en-adopcion/${id}`, { estado });

export default api;