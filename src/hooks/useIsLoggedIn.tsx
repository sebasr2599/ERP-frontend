import { isLoggedIn } from '../utils/auth-util';

function useIsLoggedIn(): () => boolean {
  // TODO: add useEffect to get the token from storage and set to is logged In
  const isAuthenticated = isLoggedIn();
  return () => {
    if (!isAuthenticated) {
      return false;
    } else {
      return true;
    }
  };
}
export default useIsLoggedIn;
