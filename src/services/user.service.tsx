import { AxiosERPInstance } from './axiosInstance.config';
const backend = import.meta.env.VITE_BACKEND_URL;

export const getUsers = async (): Promise<User[]> => {
  const response = await AxiosERPInstance.get(`${backend}/user`);
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await AxiosERPInstance.get(`${backend}/user/${id}`);
  return response.data;
};
