import Login from '../../pages/Login/Login';
import { isLoggedIn } from '../../utils/auth-util';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isLogged = isLoggedIn(); // Use a consistent variable name across the code

  if (!isLogged) {
    return <Login />;
  }
  return children;
};
