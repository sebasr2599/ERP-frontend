import axios from 'axios';
import { useUser } from '../context/UserContext';

const backend = import.meta.env.VITE_BACKEND_URL;

// const getBearerToken = () => {
//   const user = useUser();
//   return user.accessToken;
// };
// TODO: get the bearer token from state management, might need axios interceptors
export const AxiosERPInstance = axios.create({
  baseURL: backend,
  // headers: {
  //   Authorization: `Bearer ${getBearerToken()}`,
  // },
});
