import axios from 'axios';
import { getAccessToken } from '../store/auth-store';
import { logoutAuth } from '../utils/auth-util';

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

// AxiosERPInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       logoutAuth();
//       window.location.replace('/login');
//     }
//     return Promise.reject(error);
//   },
// );
//
export { AxiosERPInstance };
