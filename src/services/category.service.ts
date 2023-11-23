import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await AxiosERPInstance.get(`/category`);
  return response.data;
};

// Create Category
export const createCategory = async (category: Category): Promise<Category> => {
  const response = await AxiosERPInstance.post(`/category`, category);
  return response.data;
};

//Delete Category
export const deleteCategory = async (id: number): Promise<Category> => {
  const response = await AxiosERPInstance.delete(`/category/${id}`);
  return response.data;
};
