import axios from 'axios';
import { getAccessToken } from '../store/auth-store';

const backend = import.meta.env.VITE_BACKEND_URL;
// const getBearerToken = () => {
//   const user = useUser();
//   return user.accessToken;
// };

const AxiosERPInstance = axios.create({
  baseURL: backend,
  // headers: {
  //   Authorization: `Bearer ${getBearerToken()}`,
  // },
});

AxiosERPInstance.interceptors.request.use((config) => {
  const token = getAccessToken() || localStorage.getItem('access_token') || undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { AxiosERPInstance };
