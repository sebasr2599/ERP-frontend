import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const hasToken = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authenticated = hasToken();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children ? children : null}</>;
};

export default ProtectedRoute;
