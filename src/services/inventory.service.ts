import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List Inventory
export const getInventor = async (): Promise<User[]> => {
  const response = await AxiosERPInstance.get(`/user`);
  return response.data;
};
