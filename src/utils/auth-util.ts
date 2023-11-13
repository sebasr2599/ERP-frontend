import { getAccessToken, getActions } from '../store/auth-store';

const { setAccessToken, setUserInformation } = getActions();

const isLoggedIn = () => {
  const accessToken = getAccessToken();
  return !!accessToken;
};

const logoutAuth = () => {
  if (!isLoggedIn()) {
    setAccessToken(undefined);
    setUserInformation(undefined);
  }
};

export { isLoggedIn, logoutAuth };
