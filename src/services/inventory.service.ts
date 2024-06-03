import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List Inventory
export const getInventor = async (): Promise<User[]> => {
  const response = await AxiosERPInstance.get(`/user`);
  return response.data;
};

// Create Inventory
export const createInventoryRegistry = async (inventory: Inventory): Promise<Inventory> => {
  const response = await AxiosERPInstance.post('/inventory', inventory);
  return response.data;
};
