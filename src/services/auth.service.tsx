import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;
// TODO: Move to simple ts file, change async func to react query and add jwtAuthCheck func
export const login = async (username: string, password: string): Promise<loginResponse | void> => {
  try {
    const response = await axios.post(`${backend}/auth/login`, { username: username, password: password });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error('401 Unauthorized');
    }
  }
};
