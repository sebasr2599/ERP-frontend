import { getAccessToken, getActions } from '../store/auth-store';

const { setAccessToken, setUserInformation } = getActions();

const isLoggedIn = () => {
  const accessToken = getAccessToken() || localStorage.getItem('access_token');
  return !!accessToken;
};

const logoutAuth = () => {
  setAccessToken(undefined);
  setUserInformation(undefined);
  localStorage.removeItem('access_token');
};

export { isLoggedIn, logoutAuth };
