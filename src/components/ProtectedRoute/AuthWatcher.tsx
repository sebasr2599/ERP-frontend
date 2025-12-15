import { useEffect } from 'react';
import { verifyAuth } from '../../services/auth.service';
import { logoutAuth } from '../../utils/auth-util';

const AuthWatcher = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const ok = await verifyAuth();
      if (!ok) {
        logoutAuth();
        window.location.replace('/login');
      }
    }, 1000 * 60 * 20); // 2 minutes

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default AuthWatcher;
