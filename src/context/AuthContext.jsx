import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api, { loginUser, registerUser } from '../services/apiService';
import { roleMapa } from '../utils/roleMapa';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* ------------------------ restaurar sesión ------------------------ */
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const saved = sessionStorage.getItem('user');

    if (token && saved) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(saved));
      } catch {
        sessionStorage.clear();
      }
    }
  }, []);

  /* ----------------------------- login ------------------------------ */
  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      const { token, user: rawUser } = data;

      const decoded = jwtDecode(token);
      const roleData = roleMapa[decoded.role];
      if (!roleData) throw new Error('Rol desconocido');

      const userWithRole = {
        ...rawUser,
        role: roleData.name,
        permissions: roleData.permissions,
      };

      setUser(userWithRole);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(userWithRole));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (userWithRole.role === 'refugio') {
      await loadRefugioId();
    }

      return { token, user: userWithRole };
    } catch (err) {
      console.error('Login error', err);
      return null;
    }
  };

  /* ---------------------------- register ---------------------------- */
  const register = async (userData) => {
    try {
      const { data } = await registerUser(userData);
      const { token, user: rawUser } = data;

      const decoded = jwtDecode(token);
      const roleData = roleMapa[decoded.role];
      if (!roleData) throw new Error('Rol desconocido');

      const userWithRole = {
        ...rawUser,
        role: roleData.name,
        permissions: roleData.permissions,
      };

      setUser(userWithRole);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(userWithRole));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { success: true, token, user: userWithRole };
    } catch (err) {
      console.error('Register error', err);
      return { success: false, error: err.response?.data?.message || 'Error desconocido' };
    }
  };

  /* ----------------------------- logout ----------------------------- */
  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    delete api.defaults.headers.common['Authorization'];
  };

  /* --------------------------- refreshUser -------------------------- */
  const refreshUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      const rawUser = data.user;

      const decoded = jwtDecode(sessionStorage.getItem('token'));
      const roleData = roleMapa[decoded.role];
      if (!roleData) throw new Error('Rol desconocido');

      const userWithRole = {
        ...rawUser,
        role: roleData.name,
        permissions: roleData.permissions,
      };

      setUser(userWithRole);
      sessionStorage.setItem('user', JSON.stringify(userWithRole));
    } catch (err) {
      console.error('Error al refrescar usuario', err);
      logout();
    }
  };

  /* --------------------- cargar y guardar refugioId -------------------- */
const loadRefugioId = async () => {
  if (!user || user.role !== 'refugio') return;
  try {
    const { data } = await api.get('/api/refugios/yo/mi');
    sessionStorage.setItem('refugioId', data._id);
  } catch (err) {
    console.warn('No se pudo obtener refugioId:', err);
    sessionStorage.removeItem('refugioId');
  }
};

  /* ------------------------------------------------------------------ */
  return (
    <AuthContext.Provider value={{ user, login, logout, register, refreshUser,loadRefugioId }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ----------------------------- hook --------------------------------- */
export const useAuth = () => { 
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};