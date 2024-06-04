import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth-util';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isLogged = isLoggedIn(); // Use a consistent variable name across the code

  if (!isLogged) {
    return <Navigate to={'/login'} replace />;
  }
  return <>{children ? children : null}</>;
};
