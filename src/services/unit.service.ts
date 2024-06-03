import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all Units
export const getUnits = async (): Promise<Unit[]> => {
  const response = await AxiosERPInstance.get(`/unit`);
  return response.data;
};

// Create Unit
export const createUnit = async (unit: Unit): Promise<Unit> => {
  const response = await AxiosERPInstance.post(`/unit`, unit);
  return response.data;
};

// Read Unit
export const readUnit = async (id: number): Promise<Unit> => {
  const response = await AxiosERPInstance.get(`/unit/${id}`);
  return response.data;
};

// Update Unit
export const updateUnit = async (unit: Client): Promise<Unit> => {
  const id = unit.id;
  const response = await AxiosERPInstance.patch(`/unit/${id}`, unit);
  return response.data;
};

//Delete Unit
export const deleteUnit = async (unit: Unit): Promise<Unit> => {
  const response = await AxiosERPInstance.delete(`/unit/${unit.id}`);
  return response.data;
};
