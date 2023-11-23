import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all Units
export const getUnits = async (): Promise<Unit[]> => {
  const response = await AxiosERPInstance.get(`/unit`);
  return response.data;
};

// Create Category
export const createUnit = async (unit: Unit): Promise<Unit> => {
  const response = await AxiosERPInstance.post(`/unit`, unit);
  return response.data;
};

//Delete Category
export const deleteUnit = async (id: number): Promise<Unit> => {
  const response = await AxiosERPInstance.delete(`/unit/${id}`);
  return response.data;
};
