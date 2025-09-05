// src/components/PermissionRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { can } from '../utils/permissions';
import AccessDenied from './AccessDenied';

const PermissionRoute = ({ children, permission }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!can(user, permission)) {
    return <AccessDenied />;
  }

  return children;
};

export default PermissionRoute;