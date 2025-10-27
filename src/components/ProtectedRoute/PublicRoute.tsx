import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children ? children : null}</>;
};

export default PublicRoute;
