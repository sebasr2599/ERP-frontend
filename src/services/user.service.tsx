import { AxiosERPInstance } from '../Lib/axiosInstance.config';

export const getUsers = async (): Promise<User[]> => {
  const response = await AxiosERPInstance.get(`/user`);
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await AxiosERPInstance.get(`/user/${id}`);
  return response.data;
};
